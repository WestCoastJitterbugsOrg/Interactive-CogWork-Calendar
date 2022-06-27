type ToStringable = boolean | number | bigint | string | symbol;

export default function Error({ message }: { message: unknown }) {
  return (
    <div className="container m-auto my-8">
      <h1 className="text-accented text-2xl font-bold underline">
        Error while loading data!
      </h1>
      <p className="font-bold">Got the following error:</p>
      <pre className="font-mono" data-testid="error-message">{getError(message)}</pre>
    </div>
  );
}

function getError(error: unknown): string | undefined {
  if (typeof error === "object") {
    return JSON.stringify(error, null, 4);
  } else {
    return getToStringableError(error as ToStringable | undefined);
  }
}

function getToStringableError(error: ToStringable | undefined): string {
  try {
    return JSON.stringify(JSON.parse(error?.toString?.() ?? ""), null, 4);
  } catch {
    return error?.toString?.() ?? "Unknown error";
  }
}
