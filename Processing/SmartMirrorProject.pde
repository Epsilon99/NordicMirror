import KinectPV2.KJoint;
import KinectPV2.*;

KinectPV2 kinect;

void setup()
{
  //Size of screen - Used for debugging and training Wekinator
  size(512, 424, P3D);
  
  //OSC stuff
  oscP5Sender = new OscP5(this, 9000);
  destination = new NetAddress("127.0.0.1", 6448);
  
  //Kinect stuff
  kinect = new KinectPV2(this);
  
  kinect.enableDepthMaskImg(true);
  kinect.enableSkeletonDepthMap(true);
  
  kinect.init();
}

void draw()
{
  background(0);
  
  image(kinect.getDepthMaskImage(),0,0);
  
  ArrayList<KSkeleton> skeletonArray = kinect.getSkeletonDepthMap();
  
  for(int i = 0; i < skeletonArray.size(); i++)
  {
    KSkeleton skeleton = (KSkeleton) skeletonArray.get(i);
    
    if(skeleton.isTracked())
    {
      KJoint[] joints = skeleton.getJoints();
      
      fill(100,100,100);
      stroke(100,100,100);
      line(joints[KinectPV2.JointType_ElbowLeft].getX(),joints[KinectPV2.JointType_ElbowLeft].getY(),joints[KinectPV2.JointType_ElbowLeft].getZ(),joints[KinectPV2.JointType_WristLeft].getX(),joints[KinectPV2.JointType_WristLeft].getY(),joints[KinectPV2.JointType_WristLeft].getZ());
      line(joints[KinectPV2.JointType_WristLeft].getX(),joints[KinectPV2.JointType_WristLeft].getY(),joints[KinectPV2.JointType_WristLeft].getZ(),joints[KinectPV2.JointType_HandLeft].getX(),joints[KinectPV2.JointType_HandLeft].getY(),joints[KinectPV2.JointType_HandLeft].getZ());
      
      int[] coordinates = new int[3];
      
      if(joints[KinectPV2.JointType_HandRight].getState() == KinectPV2.HandState_Open && joints[KinectPV2.JointType_HandLeft].getState() != KinectPV2.HandState_Open)
      {
        coordinates[0] = (int)joints[KinectPV2.JointType_HandRight].getX();
        coordinates[1] = (int)joints[KinectPV2.JointType_HandRight].getY();
        coordinates[2] = (int)joints[KinectPV2.JointType_HandRight].getZ();
      }
      else if(joints[KinectPV2.JointType_HandLeft].getState() == KinectPV2.HandState_Open && joints[KinectPV2.JointType_HandRight].getState() != KinectPV2.HandState_Open)
      {
        coordinates[0] = (int)joints[KinectPV2.JointType_HandLeft].getX();
        coordinates[1] = (int)joints[KinectPV2.JointType_HandLeft].getY();
        coordinates[2] = (int)joints[KinectPV2.JointType_HandLeft].getZ();
      }
      else
      {
        coordinates[0] = 0;
        coordinates[1] = 0;
        coordinates[2] = 0;
      }
      
      sendOsc(coordinates);
    }
  }
}
