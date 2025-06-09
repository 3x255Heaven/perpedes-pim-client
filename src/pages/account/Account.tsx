import { Input } from "@/shared/input";
import { Button } from "@/shared/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/card";
import { useUserQuery } from "@/hooks/useUser";
import { Spinner } from "@/shared/spinner";

export const Account = () => {
  const userQuery = useUserQuery();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {userQuery.isPending ? (
        <Spinner />
      ) : (
        <Card className="w-full max-w-md shadow-2xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-xl">Account Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  type="text"
                  placeholder="First Name"
                  defaultValue={userQuery.data.firstName}
                  disabled
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  defaultValue={userQuery.data.lastName}
                  disabled
                />
              </div>
              <Input
                type="text"
                placeholder="Username"
                defaultValue={userQuery.data.username}
                disabled
              />
              <Input
                type="password"
                placeholder="Password"
                defaultValue="*****"
                disabled
              />
              <Button type="button" className="w-full" disabled>
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
