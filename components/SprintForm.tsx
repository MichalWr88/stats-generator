import { Issue, Sprint } from "@/models/Sprint";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { sendSprintData } from "./api/dataProvider";
import useSendSprint from "./api/hooks/useSendSprint";
import ReactFormProvider from "./FormProvider";
import InputField from "./InputField";
type Props = {
  issues?: Array<Issue>;
};

const SprintForm = ({ issues = [] }: Props) => {
  const addSprint = useSendSprint();

  const onSubmit = (data: Sprint) => {

    addSprint({ ...data, issues });
  };
  return (
    <ReactFormProvider<Sprint> onSubmit={onSubmit}>
      <div className="grid grid-cols-10 p-6  gap-4 items-end justify-center grid-rows-10 border-b-2  border-cyan-600">
        <InputField label={"Numer sprintu"} name={"nr"} type="number" />
        <InputField
          label={"Zaplanowane"}
          name={"plan"}
          className={"col-span-2"}
          type="number"
          step=".5"
        />
        <InputField
          label={"Dowiezione"}
          name={"delivered"}
          className={"col-span-2"}
          type="number"
          step=".5"
        />
        <InputField
          label={"start sprintu"}
          name={"start"}
          className={"col-span-2"}
          type={"date"}
        />
        <InputField
          label={"koniec sprintu"}
          name={"end"}
          className={"col-span-2"}
          type={"date"}
        />

        <h2 className="grid-row-2  col-start-1">Request</h2>
        <InputField label={"New"} name={"request.new"} type="number" />
        <InputField label={"Review"} name={"request.review"} type="number" />
        <InputField
          label={"In progress"}
          name={"request.inProgress"}
          type="number"
        />
        <InputField
          label={"In testing"}
          name={"request.inTesting"}
          type="number"
        />
        <InputField label={"RFD"} name={"request.rfd"} type="number" />
        <InputField label={"Done"} name={"request.done"} type="number" />
        <h2 className="grid-row-3 col-start-1 ">Bug</h2>
        <InputField
          label={"In progress"}
          name={"bug.inProgress"}
          type="number"
        />
        <InputField label={"In testing"} name={"bug.inTesting"} type="number" />
        <InputField label={"Review"} name={"bug.review"} type="number" />
        <InputField label={"Closed"} name={"bug.closed"} type="number" />
        <InputField label={"New"} name={"bug.new"} type="number" />
        <InputField label={"RFD"} name={"bug.rfd"} type="number" />
        <InputField label={"On hold"} name={"bug.onHold"} type="number" />
        <InputField label={"Accepted"} name={"bug.accepted"} type="number" />
        <button
          type="submit"
          className="bg-lime-700 text-white uppercase rounded-lg h-12 col-start-9"
        >
          dodaj
        </button>
      </div>
    </ReactFormProvider>
  );
};

export default SprintForm;
