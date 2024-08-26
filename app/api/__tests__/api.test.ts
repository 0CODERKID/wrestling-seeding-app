import { NextRequest, NextResponse } from 'next/server';
import { submitWrestlerData, getWrestlerData } from '../route';

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({ data, options })),
  },
  NextRequest: jest.fn(),
}));

jest.mock('@/lib/mongodb', () => ({
  __esModule: true,
  default: Promise.resolve({
    db: () => ({
      collection: () => ({
        findOne: jest.fn(),
        updateOne: jest.fn(),
      }),
    }),
  }),
}));

describe('API Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/submit-wrestler-data', () => {
    it('submits wrestler data successfully', async () => {
      const mockUpdateOne = jest.fn().mockResolvedValue({ modifiedCount: 1 });
      const clientPromise = await import('@/lib/mongodb');
      clientPromise.default.db().collection().updateOne = mockUpdateOne;

      const mockRequest = {
        json: jest.fn().mockResolvedValue({ schoolName: 'Test School', wrestlerData: {} }),
      } as unknown as NextRequest;

      const response = await submitWrestlerData(mockRequest);
      
      expect(response).toEqual({
        data: { message: 'Data submitted successfully' },
        options: { status: 200 }
      });
    });
  });

  describe('GET /api/get-wrestler-data', () => {
    it('retrieves wrestler data successfully', async () => {
      const mockWrestlerData = { name: 'John Doe', grade: 9 };
      const mockFindOne = jest.fn().mockResolvedValue({ wrestlerData: mockWrestlerData });
      const clientPromise = await import('@/lib/mongodb');
      clientPromise.default.db().collection().findOne = mockFindOne;

      const mockRequest = {
        nextUrl: { searchParams: new URLSearchParams('school=Test School') },
      } as unknown as NextRequest;

      const response = await getWrestlerData(mockRequest);
      
      expect(response).toEqual({
        data: { wrestlerData: mockWrestlerData },
        options: { status: 200 }
      });
    });

    it('returns null when no data is found', async () => {
      const mockFindOne = jest.fn().mockResolvedValue(null);
      const clientPromise = await import('@/lib/mongodb');
      clientPromise.default.db().collection().findOne = mockFindOne;

      const mockRequest = {
        nextUrl: { searchParams: new URLSearchParams('school=Test School') },
      } as unknown as NextRequest;

      const response = await getWrestlerData(mockRequest);
      
      expect(response).toEqual({
        data: { wrestlerData: null },
        options: { status: 200 }
      });
    });
  });
});