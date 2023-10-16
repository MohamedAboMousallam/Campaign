import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import styles from '../pages/styles.module.css';
import { fetchCampaigns, deleteCampaign, generateVouchers, listVouchers, Campaign, Voucher } from '../utils/campaignApi';

export default function ListCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const handleDeleteCampaign = async (campaignId: string) => {
    try {
      await deleteCampaign(campaignId);
      setCampaigns(campaigns.filter((campaign) => campaign.id !== campaignId));
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleDownloadCSV = () => {
    if (vouchers.length === 0) {
      alert('No vouchers to export.');
      return;
    }

    const csvContent = Papa.unparse([
      ['Campaign Name', 'Campaign ID', 'Voucher Code'],
      ...vouchers.map(voucher => [selectedCampaign?.name || '', selectedCampaign?.id || '', voucher.code]),
    ]);

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'vouchers.csv';

    // Trigger the download
    a.click();

    // Clean up
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchCampaigns();
        setCampaigns(data);
      } catch (error) {
        console.error('Error:', error);
      }
    }
    fetchData();
  }, []); 

  const handleListVouchers = async (campaignId: string) => {
    try {
      const data = await listVouchers(campaignId);
      setVouchers(data);
      setSelectedCampaign(campaigns.find((campaign) => campaign.id === campaignId) || null);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleGenerateVouchers = async (campaignId: string, quantity: number) => {
    try {
      await generateVouchers(campaignId, quantity);
      // Refresh vouchers after generating
      handleListVouchers(campaignId);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <div>
      <h2>List of Campaigns</h2>
      <a href="#" onClick={() => handleDownloadCSV()}
        className={`${styles.customDownloadLink}`}>
        Download CSV
      </a>
      <table className={styles.voucherTable}>
        <thead className={styles.voucherHeader}>
          <tr>
            <th scope="col">Campaign Name</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Amount</th>
            <th scope="col">Currency</th>
            <th scope="col">Prefix</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign, index) => (
            <tr key={campaign.id} className={`${styles.voucherRow} ${index % 2 === 0 ? styles.even : styles.odd}`}>
              <td className={styles.voucherData}>{campaign.name}</td>
              <td className={styles.voucherData}>{campaign.validityStart}</td>
              <td className={styles.voucherData}>{campaign.validityEnd}</td>
              <td className={styles.voucherData}>{campaign.amount}</td>
              <td className={styles.voucherData}>{campaign.currency}</td>
              <td className={styles.voucherData}>{campaign.prefix}</td>
              <td className={styles.voucherData}>
                <div className={styles.voucherActions}>
                  <a href="#" onClick={() => handleDeleteCampaign(campaign.id)}
                    className={`${styles.fontMedium} ${styles.textRed600} ${styles.hoverUnderline}`}>
                    Delete
                  </a>
                  <a href="#" onClick={() => handleGenerateVouchers(campaign.id, 10)}
                    className={`${styles.fontMedium} ${styles.textRed600} ${styles.hoverUnderline}`}>
                    Generate Vouchers
                  </a>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Vouchers for {selectedCampaign?.name}</h2>
      <table className={styles.voucherTable}>
        <thead className={styles.voucherHeader}>
          <tr>
            <th scope="col">Campaign Name</th>
            <th scope="col">Campaign ID</th>
            <th scope="col">Voucher Code</th>
          </tr>
        </thead>
        <tbody>
          {vouchers.map(voucher => (
            <tr key={voucher.id} className={styles.voucherRow}>
              <td className={styles.voucherData}>{selectedCampaign?.name}</td>
              <td className={styles.voucherData}>{selectedCampaign?.id}</td>
              <td className={styles.voucherData}>{voucher.code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
