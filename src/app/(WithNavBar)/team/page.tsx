import PersonsLists from '@/components/team/PersonsLists';
import TeamServerForm from '@/components/team/TeamServerForm';
import WrapperSlackSendSession from '@/components/team/WrapperSlackSendSession';
import { getCurrentWeekNumber } from '@/utils/dateHelpers';

const page = () => {
  return (
    <div className="grid grid-cols-2">
      <div className="col-span-2 flex justify-center flex-row items-center gap-2">
        Numer obecnego tygodnia : {getCurrentWeekNumber()}
        <WrapperSlackSendSession>
          <TeamServerForm />
        </WrapperSlackSendSession>
      </div>
      <PersonsLists />
    </div>
  );
};

export default page;
