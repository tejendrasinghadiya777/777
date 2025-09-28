const {
  createItinerary,
  getItinerary,
  updateItinerary,
  deleteItinerary,
} = require('../../controllers/itenaryController');
const itineraryService = require('../../repository/itineraryService');

jest.mock('../../repository/itineraryService');

describe('itineraryController unit tests', () => {
  let req, res, next;

  beforeEach(() => {
    req = { body: {}, params: {}, user: { id: 'user123' }, query: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
    jest.clearAllMocks();
  });

  //////////////////////
  it('createItinerary - success', async () => {
    req.body = {
  title: "Trip",
  destination: "Paris",
  startDate: "2025-12-20",
  endDate: "2025-12-27",
  activities: [
    {
      time: "09:00 AM - 11:00 AM",
      description: "Visit Eiffel Tower",
      location: "Paris"
    },
    {
      time: "12:00 PM - 02:00 PM",
      description: "Lunch at Le Jules Verne",
      location: "Paris"
    }
  ],
  description: "A week-long trip covering key attractions in Paris.",
  location: "France"
};
    itineraryService.createItineraryService.mockResolvedValue({ ...req.body, userId: req.user.id });

    await createItinerary(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ title: 'Trip', userId: 'user123' }));
  });

  it('createItinerary - missing fields', async () => {
    req.body = { title: 'Trip' }; // missing required fields

    await createItinerary(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(next.mock.calls[0][0].message).toMatch(/All fields are mandatory/i);
  });

  ////////////////////////////
  it('getItinerary - not found', async () => {
    req.params.id = 'notfound';
    itineraryService.getItineraryService.mockResolvedValue(null);

    await getItinerary(req, res, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(next).toHaveBeenCalledWith(expect.any(Error));
    expect(next.mock.calls[0][0].message).toMatch(/Itinerary not found/i);
  });

   ////////////////////////////
  it('getItinerary - success', async () => {
    req.params.id = 'it123';
    itineraryService.getItineraryService.mockResolvedValue({ _id: 'it123', userId: 'user123', title: 'Trip' });

    await getItinerary(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ _id: 'it123', title: 'Trip' }));
  });

   /////////////////////////////
  it('deleteItinerary - success', async () => {
    req.params.id = 'it123';
    itineraryService.deleteItineraryService.mockResolvedValue({ _id: 'it123', userId: 'user123', title: 'Trip' });

    await deleteItinerary(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Deleted Successfully'});
  });

  ///////////////////////////
  it('Unauthorized User - ', async () => {
    req.params.id = 'it123';
    itineraryService.getItineraryService.mockResolvedValue({ _id: 'it123', userId: 'user124', title: 'Trip' });

    await deleteItinerary(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
  });
  it('updateItinerary - success', async () => {
    req.body = {
  title: "Trip",
  destination: "Paris",
  startDate: "2025-12-20",
  endDate: "2025-12-27",
  activities: [
    {
      time: "09:00 AM - 11:00 AM",
      description: "Visit Eiffel Tower",
      location: "Paris"
    },
    {
      time: "12:00 PM - 02:00 PM",
      description: "Lunch at Le Jules Verne",
      location: "Paris"
    }
  ],
  description: "A week-long trip covering key attractions in Paris.",
  location: "France"
};
    req.params.id = 'it123';
    itineraryService.getItineraryService.mockResolvedValue({ _id: 'it123', userId: 'user123', title: 'Trip'});

    await updateItinerary(req, res);

    expect(res.status).toHaveBeenCalledWith(202);
  });


  ////////////////////////////
  it('getItinerary - success', async () => {
    req.params.id = 'it123';
    itineraryService.getItineraryService.mockResolvedValue({ _id: 'it123', userId: 'user123', title: 'Trip' });

    await getItinerary(req, res, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ _id: 'it123', title: 'Trip' }));
  });
});