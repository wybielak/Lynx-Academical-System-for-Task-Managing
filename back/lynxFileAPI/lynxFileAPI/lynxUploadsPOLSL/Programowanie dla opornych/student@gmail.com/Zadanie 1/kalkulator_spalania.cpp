#include <iostream>

using namespace std;


int main() {
	double final_fuel_consumpcion = 0;
	double final_fuel_price = 0;
	double car_fuel_consumpcion;
	double distance;
	double fuel_price;
	
	cout<<"KALKULATOR SPALANIA\n\n";
	
	cout<<"Dlugosc planowanej trasy w kilometrach: ";
	cin>>distance;
	
	cout<<"Spalanie w litrach na 100 km: ";
	cin>>car_fuel_consumpcion;
	
	cout<<"Cena litra paliwa: ";
	cin>>fuel_price;
	
	final_fuel_consumpcion = (distance * 0.01) * car_fuel_consumpcion;
	final_fuel_price = final_fuel_consumpcion * fuel_price;
	
	cout<<"Spalone zostanie "<<final_fuel_consumpcion<<" l"<<endl
		<<"Koszt przejechania "<<final_fuel_price<<" zl";
	return 0;
}
