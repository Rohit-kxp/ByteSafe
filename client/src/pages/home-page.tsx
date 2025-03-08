import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Shield } from "lucide-react";

export default function HomePage() {
  const { user, logoutMutation } = useAuth();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-6 w-6 text-primary" />
              Welcome to ByteSafe, {user?.username}
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => logoutMutation.mutate()}
              disabled={logoutMutation.isPending}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm">
              <p>You are securely logged in!</p>
              <ul>
                <li>Email: {user?.email}</li>
                <li>Phone: {user?.phoneNumber}</li>
                <li>Last Login: {user?.lastLoginTime ? new Date(user.lastLoginTime).toLocaleString() : 'Never'}</li>
                <li>Last Location: {user?.lastLoginLocation || 'Unknown'}</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}