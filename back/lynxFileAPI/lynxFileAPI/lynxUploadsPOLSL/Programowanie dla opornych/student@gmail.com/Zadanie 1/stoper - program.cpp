#include <iostream>
#include <windows.h>
#include <time.h>

using namespace std;


int main()
{
	int t,m=60;
	
	cout<<"How much time i count down?"<<endl;
	cin>>t;
	
	t-=1;
	
	system (" cls " );

	while(t>=0)
	{
		cout<<t<<" : "<<m;
	
		Sleep ( 1000 );
		system (" cls " );
		
		m-=1;
		
		if (m==0)
		{
			m=60;
			t-=1;
		}
	}
	
	cout<<"END"<<endl<<"You did it"<<endl;
	
	system ( "pause" );	
}
