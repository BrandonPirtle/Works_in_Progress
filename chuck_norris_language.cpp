/*H**********************************************************************
* FILENAME :    chuck_norris_language.cpp
*
* DESCRIPTION :
*       Exhibits implementation of encryption designed by Chuck Norris
*
* NOTES :
*       Compiled using: g++ chuck_norris_language.cpp -o chuck_norris_language
* 
* AUTHOR :    Brandon Pirtle        START DATE :     4 Jul 15
*                                   EDIT  DATE :    13 Dec 17
*
*H*/

#include <iostream>
#include <string>
#include <vector>
#include <algorithm>

using namespace std;

int main(int argc, char *argv[]) {
    string MESSAGE;
    cout << "Enter message below:" << endl;
    getline(cin, MESSAGE);
    string unencryptedAnswer = "";
    string   encryptedAnswer = "";
    int countZero = 0;
    int countOne  = 0;
    for (int i = 0; i < MESSAGE.length(); i++) {
        if (MESSAGE.at(i) == 'A')
            unencryptedAnswer += "1000001";
        else if (MESSAGE.at(i) == 'B')
            unencryptedAnswer += "1000010";
        else if (MESSAGE.at(i) == 'C')
            unencryptedAnswer += "1000011";
        else if (MESSAGE.at(i) == 'D')
            unencryptedAnswer += "1000100";
        else if (MESSAGE.at(i) == 'E')
            unencryptedAnswer += "1000101";
        else if (MESSAGE.at(i) == 'F')
            unencryptedAnswer += "1000110";
        else if (MESSAGE.at(i) == 'G')
            unencryptedAnswer += "1000111";
        else if (MESSAGE.at(i) == 'H')
            unencryptedAnswer += "1001000";
        else if (MESSAGE.at(i) == 'I')
            unencryptedAnswer += "1001001";
        else if (MESSAGE.at(i) == 'J')
            unencryptedAnswer += "1001010";
        else if (MESSAGE.at(i) == 'K')
            unencryptedAnswer += "1001011";
        else if (MESSAGE.at(i) == 'L')
            unencryptedAnswer += "1001100";
        else if (MESSAGE.at(i) == 'M')
            unencryptedAnswer += "1001101";
        else if (MESSAGE.at(i) == 'N')
            unencryptedAnswer += "1001110";
        else if (MESSAGE.at(i) == 'O')
            unencryptedAnswer += "1001111";
        else if (MESSAGE.at(i) == 'P')
            unencryptedAnswer += "1010000";
        else if (MESSAGE.at(i) == 'Q')
            unencryptedAnswer += "1010001";
        else if (MESSAGE.at(i) == 'R')
            unencryptedAnswer += "1010010";
        else if (MESSAGE.at(i) == 'S')
            unencryptedAnswer += "1010011";
        else if (MESSAGE.at(i) == 'T')
            unencryptedAnswer += "1010100";
        else if (MESSAGE.at(i) == 'U')
            unencryptedAnswer += "1010101";
        else if (MESSAGE.at(i) == 'V')
            unencryptedAnswer += "1010110";
        else if (MESSAGE.at(i) == 'W')
            unencryptedAnswer += "1010111";
        else if (MESSAGE.at(i) == 'X')
            unencryptedAnswer += "1011000";
        else if (MESSAGE.at(i) == 'Y')
            unencryptedAnswer += "1011001";
        else if (MESSAGE.at(i) == 'Z')
            unencryptedAnswer += "1011010";
        else if (MESSAGE.at(i) == 'a')
            unencryptedAnswer += "1100001";
        else if (MESSAGE.at(i) == 'b')
            unencryptedAnswer += "1100010";
        else if (MESSAGE.at(i) == 'c')
            unencryptedAnswer += "1100011";
        else if (MESSAGE.at(i) == 'd')
            unencryptedAnswer += "1100100";
        else if (MESSAGE.at(i) == 'e')
            unencryptedAnswer += "1100101";
        else if (MESSAGE.at(i) == 'f')
            unencryptedAnswer += "1100110";
        else if (MESSAGE.at(i) == 'g')
            unencryptedAnswer += "1100111";
        else if (MESSAGE.at(i) == 'h')
            unencryptedAnswer += "1101000";
        else if (MESSAGE.at(i) == 'i')
            unencryptedAnswer += "1101001";
        else if (MESSAGE.at(i) == 'j')
            unencryptedAnswer += "1101010";
        else if (MESSAGE.at(i) == 'k')
            unencryptedAnswer += "1101011";
        else if (MESSAGE.at(i) == 'l')
            unencryptedAnswer += "1101100";
        else if (MESSAGE.at(i) == 'm')
            unencryptedAnswer += "1101101";
        else if (MESSAGE.at(i) == 'n')
            unencryptedAnswer += "1101110";
        else if (MESSAGE.at(i) == 'o')
            unencryptedAnswer += "1101111";
        else if (MESSAGE.at(i) == 'p')
            unencryptedAnswer += "1110000";
        else if (MESSAGE.at(i) == 'q')
            unencryptedAnswer += "1110001";
        else if (MESSAGE.at(i) == 'r')
            unencryptedAnswer += "1110010";
        else if (MESSAGE.at(i) == 's')
            unencryptedAnswer += "1110011";
        else if (MESSAGE.at(i) == 't')
            unencryptedAnswer += "1110100";
        else if (MESSAGE.at(i) == 'u')
            unencryptedAnswer += "1110101";
        else if (MESSAGE.at(i) == 'v')
            unencryptedAnswer += "1110110";
        else if (MESSAGE.at(i) == 'w')
            unencryptedAnswer += "1110111";
        else if (MESSAGE.at(i) == 'x')
            unencryptedAnswer += "1111000";
        else if (MESSAGE.at(i) == 'y')
            unencryptedAnswer += "1111001";
        else if (MESSAGE.at(i) == 'z')
            unencryptedAnswer += "1111010";
        else if (MESSAGE.at(i) == ' ')
            unencryptedAnswer += "0100000";
        else if (MESSAGE.at(i) == '0')
            unencryptedAnswer += "0110000";
        else if (MESSAGE.at(i) == '1')
            unencryptedAnswer += "0110001";
        else if (MESSAGE.at(i) == '2')
            unencryptedAnswer += "0110010";
        else if (MESSAGE.at(i) == '3')
            unencryptedAnswer += "0110011";
        else if (MESSAGE.at(i) == '4')
            unencryptedAnswer += "0110100";
        else if (MESSAGE.at(i) == '5')
            unencryptedAnswer += "0110101";
        else if (MESSAGE.at(i) == '6')
            unencryptedAnswer += "0110110";
        else if (MESSAGE.at(i) == '7')
            unencryptedAnswer += "0110111";
        else if (MESSAGE.at(i) == '8')
            unencryptedAnswer += "0111000";
        else if (MESSAGE.at(i) == '9')
            unencryptedAnswer += "0111001";
        else if (MESSAGE.at(i) == '!')
            unencryptedAnswer += "0100001";
        else if (MESSAGE.at(i) == '\"')
            unencryptedAnswer += "0100010";
        else if (MESSAGE.at(i) == '%')
            unencryptedAnswer += "0100101";
        else if (MESSAGE.at(i) == '\'')
            unencryptedAnswer += "0100111";
        else if (MESSAGE.at(i) == '(')
            unencryptedAnswer += "0101000";
        else if (MESSAGE.at(i) == ')')
            unencryptedAnswer += "0101001";
        else if (MESSAGE.at(i) == ')')
            unencryptedAnswer += "0101001";
        else if (MESSAGE.at(i) == ',')
            unencryptedAnswer += "0101100";
        else if (MESSAGE.at(i) == '-')
            unencryptedAnswer += "0101101";
        else if (MESSAGE.at(i) == '.')
            unencryptedAnswer += "0101110";
        else if (MESSAGE.at(i) == ':')
            unencryptedAnswer += "0111010";
        else if (MESSAGE.at(i) == ';')
            unencryptedAnswer += "0111011";
        else if (MESSAGE.at(i) == '?')
            unencryptedAnswer += "0111111";
    }
    unencryptedAnswer += " ";
    for (int i = 0; i < unencryptedAnswer.length()-1; i++) {
        if (unencryptedAnswer.at(i) == '1') {
            countOne += 1;
            countZero = 0;
            if (unencryptedAnswer.at(i+1) != '1') {
                encryptedAnswer += "0 ";
                for(int i = 0; i < countOne; i++)
                    encryptedAnswer += "0";
                if (i != unencryptedAnswer.length()-2)
                    encryptedAnswer += " ";
            }
        }
        else { // unencryptedAnswer.at(i) == '0'
            countZero += 1;
            countOne   = 0;
            if (unencryptedAnswer.at(i+1) != '0') {
                encryptedAnswer += "00 ";
                for(int i = 0; i < countZero; i++)
                    encryptedAnswer += "0";
                if (i != unencryptedAnswer.length()-2)
                    encryptedAnswer += " ";
            }
        }
    }
    cout << encryptedAnswer << endl;
}