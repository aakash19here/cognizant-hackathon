"use client";

import { useChat } from "ai/react";
import { useEffect } from "react";

type Params = {
  params: {
    namespace: string;
  };
};

export default function MyComponent({ params: { namespace } }: Params) {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: `/api/chat/${namespace}`,
  });

  console.log(namespace);

  return (
    <div>
      <ul>
        {messages.map((m, index) => (
          <li key={index}>
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input
            value={input}
            onChange={handleInputChange}
            className="bg-black text-white border-white"
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
