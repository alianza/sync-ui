import dbConnect from "@/lib/dbConnect";
import { appRequireAuth } from "@/lib/serverUtils";
import Listing from "../../../models/Listing";

export async function GET(request) {
  await dbConnect();
  const { authQuery } = await appRequireAuth();

  try {
    const listings = await Listing.find({ ...authQuery }).lean();
    const data = listings.map(({ _id, ...listing }) => ({
      ...listing,
      id: _id.toString(),
    }));
    return Response.json({ success: true, data });
  } catch (error) {
    console.error(error);
    return Response.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}

export async function POST(request) {
  await dbConnect();
  // const { authQuery } = await appRequireAuth();

  try {
    const data = await request.json();
    const listing = await Listing.create({
      ...data,
      // ...authQuery,
    });
    return Response.json({ success: true, data: listing }, { status: 201 });
  } catch (error) {
    // if (error.code === 11000) {
    //   error.message = "This listing already exists"; // Return code for unique index constraint violation
    // }
    console.error(error);
    return Response.json(
      { success: false, error: error.message },
      { status: 400 },
    );
  }
}
