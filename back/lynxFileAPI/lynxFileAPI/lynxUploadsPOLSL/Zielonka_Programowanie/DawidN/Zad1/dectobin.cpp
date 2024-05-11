#include <iostream>
#include <time.h>
#include <windows.h>
#include "wybielak.h"

using namespace std;


int main(){
	string s;
	int l;
	char z;
	while(z!='4'){
	cout<<"======CONVERTER======"<<endl<<"1. DECtoBIN"<<endl<<"2. BINtoDEC"<<endl<<"3. CreAtorS"<<endl<<"4. ExIT"<<endl<<">> ";
	cin>>z;
	system("cls");
		switch(z){
			case '1':{
				cout<<"DEC = "; cin>>l; cout<<endl;
				cout<<"BIN = "<<dectobin(l)<<endl;
				system("pause");
				system("cls");
				break;
			}
			case '2':{
				cout<<"BIN = "; cin>>s; cout<<endl;
				cout<<"DEC = "<<bintodec(s)<<endl;
				system("pause");
				system("cls");
				break;
			}
			case '3':{
				cout<<"CreAtorS:"<<endl<<"wybielak"; Sleep ( 1000 ); cout<<" and "; Sleep ( 1000 ); cout<<"wybielak"<<endl;;
				system("pause");
				system("cls");
				break;
			}
		}
	}

}
