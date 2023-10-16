// utils/campaignApi.ts
export interface Campaign {
  id: string;
  name: string;
  validityStart: string;
  validityEnd: string;
  amount: number;
  currency: string;
  prefix: string;
}

export interface Voucher {
  id: string;
  code: string;
  campaignId: string;
}

// Create a new campaign
async function createCampaign(campaignData: Campaign): Promise<Response> {
  try {
    const response = await fetch('http://localhost:5000/campaigns', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(campaignData),
    });

    return response;
  } catch (error) {
    throw new Error('Error: ' + error);
  }
}

// Fetch campaigns from the API
async function fetchCampaigns(): Promise<Campaign[]> {
  try {
    const response = await fetch('http://localhost:5000/campaigns');
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to fetch campaigns');
    }
  } catch (error) {
    throw new Error('Error: ' + error);
  }
}

// Delete a campaign by campaignId
async function deleteCampaign(campaignId: string): Promise<void> {
  try {
    const response = await fetch(`http://localhost:5000/campaigns/${campaignId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete the campaign');
    }
  } catch (error) {
    throw new Error('Error: ' + error);
  }
}

// Generate vouchers for a campaign
async function generateVouchers(campaignId: string, quantity: number): Promise<void> {
  try {
    const response = await fetch(`http://localhost:5000/campaigns/${campaignId}/vouchers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantity: quantity }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate vouchers');
    }
  } catch (error) {
    throw new Error('Error: ' + error);
  }
}

// List vouchers for a campaign
async function listVouchers(campaignId: string): Promise<Voucher[]> {
  try {
    const response = await fetch(`http://localhost:5000/campaigns/${campaignId}/vouchers`);

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to list vouchers');
    }
  } catch (error) {
    throw new Error('Error: ' + error);
  }
}

export { fetchCampaigns, deleteCampaign, generateVouchers, listVouchers, createCampaign };
