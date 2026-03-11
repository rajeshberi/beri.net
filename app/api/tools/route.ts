import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const category = searchParams.get('category');
    const capability = searchParams.get('capability');
    const targetMarket = searchParams.get('target_market');
    const pricingModel = searchParams.get('pricing_model');
    const deploymentModel = searchParams.get('deployment_model');
    const freeTrial = searchParams.get('free_trial');
    const enterpriseReady = searchParams.get('enterprise_ready');
    const apiAccess = searchParams.get('api_access');
    const soc2 = searchParams.get('soc2');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '100');
    const sortBy = searchParams.get('sort') || 'name';
    const sortOrder = searchParams.get('order') === 'desc' ? -1 : 1;
    
    const client = await connectToDatabase();
    const db = client.db('beri-newsletter');
    const collection = db.collection('tools');
    
    // Build query
    const query: any = {};
    
    if (category) {
      query.primary_category = category;
    }
    
    if (capability) {
      query[`capabilities.${capability}`] = true;
    }
    
    if (targetMarket) {
      query.target_market = targetMarket;
    }
    
    if (pricingModel) {
      query.pricing_model = pricingModel;
    }
    
    if (deploymentModel) {
      query.deployment_model = deploymentModel;
    }
    
    if (freeTrial !== null && freeTrial !== undefined) {
      query['pricing.free_trial'] = freeTrial === 'true';
    }
    
    if (enterpriseReady) {
      query['snapshot.enterprise_ready'] = enterpriseReady;
    }
    
    if (apiAccess !== null && apiAccess !== undefined) {
      query['capabilities.api_access'] = apiAccess === 'true';
    }
    
    if (soc2 !== null && soc2 !== undefined) {
      query['security.soc2_type2'] = soc2 === 'true';
    }
    
    // Text search
    if (search) {
      query.$text = { $search: search };
    }
    
    // Build sort
    const sort: any = {};
    if (search) {
      sort.score = { $meta: 'textScore' };
    } else {
      sort[sortBy] = sortOrder;
    }
    
    // Execute query
    const projection: any = { _id: 0 };
    if (search) {
      projection.score = { $meta: 'textScore' };
    }
    
    const tools = await collection
      .find(query, { projection })
      .sort(sort)
      .limit(limit)
      .toArray();
    
    // Get metadata
    const total = await collection.countDocuments(query);
    const categories = await collection.distinct('primary_category');
    
    return NextResponse.json({
      tools,
      metadata: {
        total,
        returned: tools.length,
        categories: categories.sort(),
        filters: {
          category,
          capability,
          targetMarket,
          pricingModel,
          deploymentModel,
          freeTrial,
          enterpriseReady,
          apiAccess,
          soc2,
          search
        }
      },
      cache: 'no-store'
    });
    
  } catch (error) {
    console.error('Error fetching tools:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
