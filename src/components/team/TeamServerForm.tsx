/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { sendToSlack } from '@/api/teamProvider';
import Button from '../shared/Button/Button';


const TeamServerForm = () => {
    
  async function sendForm() {
    'use server';
    await sendToSlack();
    
  }
  return (
    <form  action={sendForm}>
      <div>
        <Button formType="submit">Send to Slack</Button>
      </div>
    </form>
  );
};

export default TeamServerForm;
