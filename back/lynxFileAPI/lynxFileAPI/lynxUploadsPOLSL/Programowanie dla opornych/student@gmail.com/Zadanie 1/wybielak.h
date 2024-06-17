/*
-->	Using librarys: <--
#include <iostream> - dectobin, bintodec, pierw, clo_t,
#include <time.h> - clo_t,
#include <windows.h> - clo_t,
#include "wybielak.h" - dectobin, bintodec,pierw, clo_t,
*/
using namespace std;

string dectobin (int l)
{
	string w="",s="";
	
	while (l>0)
	{
		if(l%2==0) w=w+'0';
		else w=w+'1';
		l=l/2;
	}
	
	int n=w.length();
	
	for (int i=n-1;i>=0;i--)
	{
		s=s+w[i];
	}
	
	return s;
}

int bintodec (string s)
{
	int l=0,m=1,n=s.length();
	
	for(int i=n-1;i>=0;i--)
	{
		if (s[i]=='1') l=l+m;
		m=m*2;
	}
	
	return l;
}

int anytodec(string num, int sys)
{
	int w;
	if (num[0]>='A' && num[0]<='Z') w=(int)num[0]-55;
	else w=(int)num[0]-48;
	
	for (int i=1; i<num.length(); i++)
	{
		if (num[i]>='A' && num[i]<='Z') w=w*sys+(int)num[i]-55;
		else w=w*sys+(int)num[i]-48;
	}
	
	return w;
}

string dectoany(int num, int sys)
{
	string w; int r;
	
	while (num>0)
	{
		r=num%sys;
		if (r<10) w=(char)(r+48)+w;
		else w=(char)(r+55)+w;
		num/=sys;
	}
	
	return w;
}

void ascii()
{
	for (int i=0; i<128; i++)
	{
		cout<<i<<". "<<(char)i<<endl;
	}
}

int strtoint(string txt)
{
	int w=(int)(txt[txt.length()-1])-48;
	int z=10;
	
	for (int i=txt.length()-2; i>=0; i--)
	{
		w+=((int)(txt[i])-48)*z;
		z*=10;
	}
	
	return w;
}

string inttostr(int num)
{
	string w;
	
	while (num>0)
	{
		w=(char)((num%10)+48)+w;
		num/=10;
	}
	
	return w;
}

float pierw (float P)
{
	float a=P/2,b;
	
	while(b!=a)
	{
		b=a;
		a=(P/a+a)/2;
	}

	return a;
}

void clo_t(){
	time_t theTime = time(NULL);
	struct tm *aTime = localtime(&theTime);

	int day = aTime->tm_mday;
	int month = aTime->tm_mon + 1; 
	int year = aTime->tm_year + 1900; 
	int hour=aTime->tm_hour;
	int min=aTime->tm_min;
	int sec=aTime->tm_sec;
	
	sec+=1;
	
	while(day<=365)
	{	
		cout<<"========"<<endl;
		cout<<hour<<":"<<min<<":"<<sec<<endl<<day<<"."<<month<<"."<<year<<endl;
		cout<<"========"<<endl;
		Sleep ( 1000 );
		sec+=1;
		system("cls");
		
		if(sec==60)
		{
			sec=1;
			min+=1;
		}
		
		if(min==60)
		{
			min=1;
			hour+=1;
		}
		
		if(hour==24)
		{
			hour=1;
			day+=1;
		}
		
		if(day==365)
		{
			year+=1;
			day=1;
		} 
	}
}

int stoper(int t)
{
	int m=60;
	t-=1;

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
	return 0;
}
