import { type NextPage } from "next";

import { api } from "@/utils/api";
import TableComponent from "@/components/tableComponent";
import { Button, Card, Input } from "react-daisyui";

const Home: NextPage = () => {
  const allExamsQuery = api.exams.getAll.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const addExamsMutation = api.exams.addExamCentre.useMutation({
    onSuccess(response) {
      if (response.success) {
        console.log("ADDED EXAM CENTRE:", response.data);
      } else {
        console.error("FAILED TO ADD CENTRE:", response.error);
      }
    },
    onError(error) {
      console.error(error);
    },
  });

  const handleAddExams = async () => {
    // Could use `useState` hook instead, but that means it will have a lot of re-renders
    const exame_centre_name_input = document.getElementById("centre_name") as HTMLInputElement;
    const exame_centre_address_input = document.getElementById("centre_address") as HTMLInputElement;
    const exame_centre_town_input = document.getElementById("centre_town") as HTMLInputElement;
    const exame_centre_owner_input = document.getElementById("centre_owner") as HTMLInputElement;
    const exame_centre_country_input = document.getElementById("centre_country") as HTMLInputElement;

    await addExamsMutation.mutateAsync({
      name: exame_centre_name_input.value,
      address: exame_centre_address_input.value,
      town: exame_centre_town_input.value,
      owner: exame_centre_owner_input.value,
      country: exame_centre_country_input.value,
    });

    allExamsQuery.refetch();
  };

  const ExamCentreHeaders = ["Name", "Address", "Town", "Owner", "Country"];
  return (
    <>
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <Card className="rounded-lg bg-primary">
          <Card.Body>
            <h1 className="text-center text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              Exam Centres
            </h1>

            <TableComponent
              headers={ExamCentreHeaders}
              examsTableData={allExamsQuery.data}
            />
          </Card.Body>
        </Card>

        <Card className="w-full max-w-md  rounded-lg bg-primary">
          <Card.Body>
            <h1 className="text-center text-2xl font-extrabold tracking-tight text-white">
              Add Exam Centre
            </h1>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Exam Centre name:</span>
              </label>
              <Input color="secondary" id="centre_name" />

              <label className="label">
                <span className="label-text">Address:</span>
              </label>
              <Input color="secondary" id="centre_address" />

              <label className="label">
                <span className="label-text">Town:</span>
              </label>
              <Input color="secondary" id="centre_town" />

              <label className="label">
                <span className="label-text">Owner Username:</span>
              </label>
              <Input color="secondary" id="centre_owner" />

              <label className="label">
                <span className="label-text">Country:</span>
              </label>
              <Input color="secondary" id="centre_country" />

              <Button
                className="mt-5 rounded-lg"
                color="accent"
                onClick={handleAddExams}
              >
                Create Centre
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default Home;
