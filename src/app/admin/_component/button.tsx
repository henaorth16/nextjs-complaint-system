import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function DeleteButton({text}:{text:string}) {
    const { pending } = useFormStatus();
  
    return (
      <Button type="submit" aria-disabled={pending}>
        {text}
      </Button>
    );
  }
  