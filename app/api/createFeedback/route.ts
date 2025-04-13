import { NextResponse } from "next/server";
import { createFeedback } from "@/lib/actions/general.action"; // Your feedback creation logic

export async function POST(req: Request) {
  try {
    const { interviewId, userId, transcript } = await req.json();

    const { success, feedbackId } = await createFeedback({
      interviewId,
      userId,
      transcript,
    });

    if (success) {
      return NextResponse.json({ success: true, feedbackId });
    } else {
      return NextResponse.json(
        { success: false, message: "Error generating feedback" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
