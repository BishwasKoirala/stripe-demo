import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req : NextRequest) {

  const payload = await req.text()

  const response = JSON.parse(payload)
  const sig = req.headers.get("Stripe-Signature")

  const dateTime = new Date(response?.created * 1000).toLocaleDateString()
  const timeString = new Date(response?.created * 1000).toLocaleTimeString()

  try{
    let event = stripe.webhooks.constructEvent(
      payload,
      sig!,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
    console.log("event",event.type)
    return NextResponse.json({status : 'succeed', event : event.type})
    
  } catch(error) {
    return NextResponse.json({status : 'failed', error})
  }


}