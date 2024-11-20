import {InfoIcon} from "lucide-react";

export const runtime = 'edge';

import { Message } from "@/components/form-message";
import HeaderAuth from "@/components/header-auth";
import {createClient} from "@/utils/supabase/server";
import {redirect} from "next/navigation";
import {EnvVarWarning} from "@/components/env-var-warning";
import {hasEnvVars} from "@/utils/supabase/check-env-vars";
import DeployButton from "@/components/deploy-button";
import Link from "next/link";



export default async function ProtectedPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/sign-in");
    }
  return (
      <div className="flex-1 w-full flex flex-col gap-12">
          <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
              <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
                  <div className="flex gap-5 items-center font-semibold">
                      <Link href={"/"}>Next.js Supabase Starter</Link>
                      <div className="flex items-center gap-2">
                          <DeployButton/>
                      </div>
                  </div>
                  {!hasEnvVars ? <EnvVarWarning/> : <HeaderAuth />}
              </div>
          </nav>
          <div className="w-full">
              <div className="bg-accent text-sm p-3 px-5 rounded-md text-foreground flex gap-3 items-center">
                  <InfoIcon size="16" strokeWidth={2}/>
                  This is a protected page that you can only see as an authenticated
                  user
              </div>
          </div>
          <div className="flex flex-col gap-2 items-start">
              <h2 className="font-bold text-2xl mb-4">Your user details</h2>
              <pre className="text-xs font-mono p-3 rounded border max-h-32 overflow-auto">
          {JSON.stringify(user, null, 2)}
        </pre>
          </div>
          <div>
              <h2 className="font-bold text-2xl mb-4">Next steps</h2>

          </div>
      </div>
  );
}
