import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "@/utils/api";
import { Button, Card, Input, Navbar } from "react-daisyui";
import TableComponent from "@/components/tableComponent";

const Users: NextPage = () => {
  const allOwnersQuery = api.owner.getAll.useQuery();

  const OwnersHeaders = [
    "Username",
    "Password",
    "Forename",
    "Surname",
    "DOB",
    "Gender",
  ];

  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <Card className="rounded-lg bg-primary">
          <Card.Body>
            <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Owners
            </h1>

            <TableComponent
              headers={OwnersHeaders}
              ownersTableData={allOwnersQuery.data}
            />
          </Card.Body>
        </Card>

        <Card className="w-full max-w-md  rounded-lg bg-primary">
          <Card.Body>
            <h1 className="text-center text-2xl font-extrabold tracking-tight text-white">
              Add Owner
            </h1>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username:</span>
              </label>
              <Input color="secondary" />
              <label className="label">
                <span className="label-text">Password:</span>
              </label>

              <Input color="secondary" />
              <label className="label">
                <span className="label-text">Forename:</span>
              </label>

              <Input color="secondary" />
              <label className="label">
                <span className="label-text">Surname:</span>
              </label>

              <Input color="secondary" />
              <label className="label">
                <span className="label-text">DOB:</span>
              </label>

              <Input color="secondary" />

              <label className="label">
                <span className="label-text">Gender:</span>
              </label>

              <Input color="secondary" />
              <Button className="mt-5 rounded-lg" color="accent">
                Create Owner
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Users;
