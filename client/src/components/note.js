import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertDemo() {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>Claim MSX first!</AlertTitle>
      <AlertDescription>
        Don't forget to claim msx before any transaction.
      </AlertDescription>
    </Alert>
  );
}
