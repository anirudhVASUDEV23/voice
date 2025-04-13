enum MessageTypeEnum {
  TRANSCRIPT = "transcript",
  FUNCTION_CALL = "function-call",
  FUNCTION_CALL_RESULT = "function-call-result",
  ADD_MESSAGE = "add-message",
}

enum MessageRoleEnum {
  USER = "user",
  SYSTEM = "system",
  ASSISTANT = "assistant",
}

enum TranscriptMessageTypeEnum {
  PARTIAL = "partial",
  FINAL = "final",
}

interface BaseMessage {
  type: MessageTypeEnum;
}

interface TranscriptMessage extends BaseMessage {
  type: MessageTypeEnum.TRANSCRIPT;
  role: MessageRoleEnum;
  transcriptType: TranscriptMessageTypeEnum;
  transcript: string;
}

interface FunctionCallMessage extends BaseMessage {
  type: MessageTypeEnum.FUNCTION_CALL;
  functionCall: {
    name: string;
    parameters: unknown;
  };
}

interface FunctionCallResultMessage extends BaseMessage {
  type: MessageTypeEnum.FUNCTION_CALL_RESULT;
  functionCallResult: {
    forwardToClientEnabled?: boolean;
    result: unknown;
    [a: string]: unknown;
  };
}

type Message =
  | TranscriptMessage
  | FunctionCallMessage
  | FunctionCallResultMessage;


/*
// Enums and interfaces from your original code (shortened here for demo)
enum MessageTypeEnum {
  TRANSCRIPT = "transcript",
  FUNCTION_CALL = "function-call",
  FUNCTION_CALL_RESULT = "function-call-result",
}

enum MessageRoleEnum {
  USER = "user",
  ASSISTANT = "assistant",
}

enum TranscriptMessageTypeEnum {
  PARTIAL = "partial",
  FINAL = "final",
}

interface BaseMessage {
  type: MessageTypeEnum;
}

interface TranscriptMessage extends BaseMessage {
  type: MessageTypeEnum.TRANSCRIPT;
  role: MessageRoleEnum;
  transcriptType: TranscriptMessageTypeEnum;
  transcript: string;
}

interface FunctionCallMessage extends BaseMessage {
  type: MessageTypeEnum.FUNCTION_CALL;
  functionCall: {
    name: string;
    parameters: any;
  };
}

interface FunctionCallResultMessage extends BaseMessage {
  type: MessageTypeEnum.FUNCTION_CALL_RESULT;
  functionCallResult: {
    result: any;
  };
}

type Message = TranscriptMessage | FunctionCallMessage | FunctionCallResultMessage;

// 💬 Simulate receiving a user message
const userMessage: TranscriptMessage = {
  type: MessageTypeEnum.TRANSCRIPT,
  role: MessageRoleEnum.USER,
  transcriptType: TranscriptMessageTypeEnum.FINAL,
  transcript: "What’s the weather in Hyderabad?"
};

// ⚙️ Assistant decides to call a function
const functionCall: FunctionCallMessage = {
  type: MessageTypeEnum.FUNCTION_CALL,
  functionCall: {
    name: "getWeather",
    parameters: { city: "Hyderabad" }
  }
};

// 📥 System sends back the result of the function
const functionResult: FunctionCallResultMessage = {
  type: MessageTypeEnum.FUNCTION_CALL_RESULT,
  functionCallResult: {
    result: "It's 34°C and sunny in Hyderabad ☀️"
  }
};

// 🎯 Function to handle any message
function handleMessage(msg: Message) {
  switch (msg.type) {
    case MessageTypeEnum.TRANSCRIPT:
      console.log(`[${msg.role}] says: ${msg.transcript}`);
      break;

    case MessageTypeEnum.FUNCTION_CALL:
      console.log(`Calling function: ${msg.functionCall.name}`);
      console.log("With parameters:", msg.functionCall.parameters);
      break;

    case MessageTypeEnum.FUNCTION_CALL_RESULT:
      console.log("Function result:", msg.functionCallResult.result);
      break;

    default:
      console.log("Unknown message type");
  }
}

// 🧪 Try it out
handleMessage(userMessage);
handleMessage(functionCall);
handleMessage(functionResult);

 */
