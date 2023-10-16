import React, { useState } from 'react';
import styles from '../pages/styles.module.css';
import { Campaign, createCampaign } from '../utils/campaignApi'; 

export default function CreateCampaign() {
  const [campaignData, setCampaignData] = useState<Campaign>({
    id: '',
    name: '',
    validityStart: '',
    validityEnd: '',
    amount: 0,
    currency: '',
    prefix: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCampaignData({ ...campaignData, [name]: value });
  };

  const handleCreateCampaign = async () => {
    try {
      const response = await createCampaign(campaignData);
      
      if (response.ok) {
        alert('Campaign created successfully');
        location.reload();
      } else {
        alert('Failed to create a campaign');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.createCampaignForm}>
      <h2>Create a Campaign</h2>
      <form>
        <label>
          Name:
          <input type="text" name="name" onChange={handleInputChange} placeholder="Campaign Name" />
        </label>

        <label>
          Start Date:
          <input type="date" name="validityStart" onChange={handleInputChange} placeholder="Start Date" />
        </label>

        <label>
          End Date:
          <input type="date" name="validityEnd" onChange={handleInputChange} placeholder="End Date" />
        </label>

        <label>
          Amount:
          <input type="number" name="amount" onChange={handleInputChange} placeholder="Amount" />
        </label>

        <label>
          Currency:
          <select name="currency" onChange={(e) => handleInputChange(e)} placeholder="Select Currency">
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
        </label>

        <label>
          Prefix:
          <input type="text" name="prefix" onChange={handleInputChange} placeholder="Prefix" />
        </label>
        <button type="button" onClick={handleCreateCampaign}>Create Campaign</button>
      </form>
    </div>
  );
}
