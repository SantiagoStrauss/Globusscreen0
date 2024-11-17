// app/api/signup/route.ts

export const runtime = 'edge';

import { NextResponse } from "next/server";
import { signUpAction } from "@/app/actions";

export async function POST(request: Request) {
  const formData = await request.formData();
  const response = await signUpAction(formData);
  return response;
}