// __tests__/app.test.ts
import request from 'supertest';
import express from 'express';
import {app} from '../src/app';

describe('API Endpoints', () => {
  it('should create a new campaign', async () => {
    const response = await request(app)
      .post('/campaigns')
      .send({
        name: 'Test Campaign',
        validityStart: '2023-11-01',
        validityEnd: '2023-12-01',
        amount: 100,
        currency: 'USD',
        prefix: 'TEST',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
  });

  it('should return a 400 error when creating a campaign with invalid data', async () => {
    const response = await request(app)
      .post('/campaigns')
      .send({
        // Invalid data (missing required fields)
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  it('should create vouchers for an existing campaign', async () => {
    // Create a campaign first
    const createCampaignResponse = await request(app)
      .post('/campaigns')
      .send({
        name: 'Test Campaign',
        validityStart: '2023-11-01',
        validityEnd: '2023-12-01',
        amount: 100,
        currency: 'USD',
        prefix: 'TEST',
      });

    const campaignId = createCampaignResponse.body.id;

    const response = await request(app)
      .post(`/campaigns/${campaignId}/vouchers`)
      .send({ quantity: 5 });

    expect(response.status).toBe(201);
    expect(response.body).toHaveLength(5);
  });

  it('should return a 404 error when creating vouchers for a non-existent campaign', async () => {
    const response = await request(app)
      .post('/campaigns/invalid_campaign_id/vouchers')
      .send({ quantity: 5 });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });

  it('should list all campaigns', async () => {
    const response = await request(app).get('/campaigns');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should list vouchers for a specific campaign', async () => {
    // Create a campaign first
    const createCampaignResponse = await request(app)
      .post('/campaigns')
      .send({
        name: 'Test Campaign',
        validityStart: '2023-11-01',
        validityEnd: '2023-12-01',
        amount: 100,
        currency: 'USD',
        prefix: 'TEST',
      });

    const campaignId = createCampaignResponse.body.id;

    const response = await request(app).get(`/campaigns/${campaignId}/vouchers`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return a 404 error when listing vouchers for a non-existent campaign', async () => {
    const response = await request(app).get('/campaigns/invalid_campaign_id/vouchers');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });

  it('should delete an existing campaign', async () => {
    // Create a campaign first
    const createCampaignResponse = await request(app)
      .post('/campaigns')
      .send({
        name: 'Test Campaign',
        validityStart: '2023-11-01',
        validityEnd: '2023-12-01',
        amount: 100,
        currency: 'USD',
        prefix: 'TEST',
      });

    const campaignId = createCampaignResponse.body.id;

    const response = await request(app).delete(`/campaigns/${campaignId}`);

    expect(response.status).toBe(204);
  });

  it('should return a 404 error when deleting a non-existent campaign', async () => {
    const response = await request(app).delete('/campaigns/invalid_campaign_id');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
  });
});


