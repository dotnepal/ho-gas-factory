/// <reference types="@cloudflare/workers-types" />

/**
 * Cloudflare Pages Function — POST /api/contact
 *
 * Accepts a JSON contact form submission, validates required fields,
 * then forwards to Web3Forms API for email delivery.
 *
 * Environment variables (set in Cloudflare Pages dashboard):
 *   WEB3FORMS_KEY — Web3Forms access key
 */

interface ContactFormData {
  name: string
  email: string
  phone: string
  company: string
  gasType?: string
  requirementType?: string
  message?: string
}

export interface Env {
  WEB3FORMS_KEY: string
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // Only accept JSON
  const contentType = request.headers.get('content-type') ?? ''
  if (!contentType.includes('application/json')) {
    return Response.json({ success: false, error: 'Content-Type must be application/json' }, { status: 415 })
  }

  let data: ContactFormData
  try {
    data = (await request.json()) as ContactFormData
  } catch {
    return Response.json({ success: false, error: 'Invalid JSON body' }, { status: 400 })
  }

  // Server-side validation of required fields
  const required: (keyof ContactFormData)[] = ['name', 'email', 'phone', 'company']
  for (const field of required) {
    const value = data[field]
    if (!value || typeof value !== 'string' || !value.trim()) {
      return Response.json(
        { success: false, error: `Field "${field}" is required` },
        { status: 400 },
      )
    }
  }

  // Basic email format check
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailPattern.test(data.email)) {
    return Response.json({ success: false, error: 'Invalid email address' }, { status: 400 })
  }

  // Forward to Web3Forms
  const payload = {
    access_key: env.WEB3FORMS_KEY,
    subject: `New Inquiry from ${data.name.trim()} — ${data.company.trim()}`,
    from_name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    company: data.company.trim(),
    gas_type: data.gasType ?? 'Not specified',
    requirement_type: data.requirementType ?? 'Not specified',
    message: data.message?.trim() ?? '(no message)',
  }

  const web3Response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!web3Response.ok) {
    return Response.json(
      { success: false, error: 'Email delivery failed. Please try again.' },
      { status: 500 },
    )
  }

  return Response.json({ success: true })
}
