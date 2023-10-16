import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Campaign } from './Campaign';
import { Voucher } from './Voucher';
import { campaigns, vouchers } from './db';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/campaigns', (req, res) => {
  const newCampaign = req.body as Campaign;

  if (!isValidCampaign(newCampaign)) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  newCampaign.id = Date.now().toString();
  campaigns.push(newCampaign);
  res.status(201).json(newCampaign);
});

// Create batch (many) vouchers inside a campaign
app.post('/campaigns/:id/vouchers', (req, res) => {
  const campaignId = req.params.id;
  const quantity = req.body.quantity;

  const campaign = findCampaignById(campaignId);

  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found' });
  }

  const newlyCreatedVouchers = createVouchers(campaign, quantity);
  res.status(201).json(newlyCreatedVouchers);
});

// List campaigns
app.get('/campaigns', (req, res) => {
  res.json(campaigns);
});

// List vouchers in a campaign
app.get('/campaigns/:id/vouchers', (req, res) => {
  const campaignId = req.params.id;
  const campaign = findCampaignById(campaignId);

  if (!campaign) {
    return res.status(404).json({ error: 'Campaign not found' });
  }

  const campaignVouchers = findVouchersByCampaignId(campaignId);
  res.json(campaignVouchers);
});

// Delete a campaign
app.delete('/campaigns/:id', (req, res) => {
  const campaignId = req.params.id;
  const index = findCampaignIndexById(campaignId);

  if (index === -1) {
    return res.status(404).json({ error: 'Campaign not found' });
  }

  campaigns.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Helper functions
function isValidCampaign(campaign: Campaign): boolean {
  return !!(
    campaign.name &&
    campaign.validityStart &&
    campaign.validityEnd &&
    campaign.amount &&
    campaign.currency &&
    campaign.prefix
  );
}

function findCampaignById(id: string): Campaign | undefined {
  return campaigns.find((c) => c.id === id);
}

function findVouchersByCampaignId(campaignId: string): Voucher[] {
  return vouchers.filter((voucher) => voucher.campaignId === campaignId);
}

function createVouchers(campaign: Campaign, quantity: number): Voucher[] {
  const newlyCreatedVouchers: Voucher[] = [];
  for (let i = 0; i < quantity; i++) {
    const code = `${campaign.prefix}-${Math.random().toString(36).substring(7)}`;
    const newVoucher: Voucher = { id: Date.now().toString(), code, campaignId: campaign.id };
    vouchers.push(newVoucher);
    newlyCreatedVouchers.push(newVoucher);
  }
  return newlyCreatedVouchers;
}

function findCampaignIndexById(id: string): number {
  return campaigns.findIndex((c) => c.id === id);
}


export { app };