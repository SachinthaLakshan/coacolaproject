import { NextResponse } from 'next/server';

let espResponce = {
    read01: 0,  
    read02: 0,
    ratePerson01: false,
    ratePerson02: false
};
export async function POST(request) {
  try {
    const body = await request.json();
    
    // Log the received data
    console.log('Received sensor data:', {
      read01: body.read01,
      read02: body.read02,
      ratePerson01: body.ratePerson01,
      ratePerson02: body.ratePerson02
    });
    espResponce = body;

    // Return success response
    return NextResponse.json(
      { 
        message: 'Data received successfully',
        data: body 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing sensor data:', error);
    return NextResponse.json(
      { error: 'Failed to process sensor data' },
      { status: 500 }
    );
  }
} 

export async function GET() {
    return new Response(JSON.stringify({ message: espResponce }), { status: 200 });
  }

export async function PUT() {
    // Clear the espResponce object
    espResponce = {
      read01: 0,  
      read02: 0,
      ratePerson01: false,
      ratePerson02: false
  };

  return NextResponse.json(
    { message: 'Data reset successfully' },
    { status: 200 }
  );
}


