import Stripe from "stripe";

import { NextResponse , NextRequest } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(request : NextRequest , response : NextResponse) {
  
  const query = await request.json()
  const siqniture = request.headers.get("Stripe-Signature")

  const dateTime = new Date(query.created * 1000).toLocaleDateString()

}