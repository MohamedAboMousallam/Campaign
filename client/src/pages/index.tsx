import React from 'react';
import styles from '../pages/styles.module.css';
import CreateCampaign from '../components/createCampaign';
import ListCampaigns from '../components/listCampaigns';

export default function Home() {
  return (
    <div className={styles.body}>
      <h1>Voucher Campaign Management</h1>
      <CreateCampaign />
      <ListCampaigns />
    </div>
  );
}
