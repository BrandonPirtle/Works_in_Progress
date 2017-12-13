#ifndef character_hpp
#define character_hpp

class Character {
	private:
		string   name;
		int     level;
		int        xp;
		int      gold;
		int        hp;
		int       str;
		int       def;
		int       acc;
		int       spd;
	public:
		       Character   (void);
		      ~Character   (void);
		void   inc_level   (void);
		void   inc_xp      (int amt);
		void   inc_gold    (int amt);
		void   inc_hp      (void);
		void   inc_str     (void);
		void   inc_def     (void);
		void   inc_acc     (void);
		void   inc_spd     (void);
		string get_name    (void);
		int    get_level   (void);
		int    get_xp      (void);
		int    get_gold    (void);
		int    get_hp      (void);
		int    get_str     (void);
		int    get_def     (void);
		int    get_acc     (void);
		int    get_spd     (void);
		void   print_stats (void);
};

Character::Character (void) {
	string new_name;
	cout << "What is your name?" << endl;
	cin  >> new_name;
	name   = new_name;
	level  =  1;
	xp     =  0;
	gold   =  0;
	hp     = 10;
	str    =  1;
	def    =  1;
	acc    =  1;
	spd    =  1;
}

Character::~Character (void) { }

void Character::inc_level (void) {
	level++;
}

void Character::inc_xp (int amt) {
	xp += amt;
}

void Character::inc_gold (int amt) {
	gold += amt;
}

void Character::inc_hp (void) {
	hp += rand() % 10 + 5;
}

void Character::inc_str (void) {
	str++;
}

void Character::inc_def (void) {
	def++;
}

void Character::inc_acc (void) {
	acc++;
}

void Character::inc_spd (void) {
	spd++;
}

string Character::get_name (void) {
	return name;
}

int Character::get_level (void) {
	return level;
}

int Character::get_xp (void) {
	return xp;
}

int Character::get_gold (void) {
	return gold;
}

int Character::get_hp (void) {
	return hp;
}

int Character::get_str (void) {
	return str;
}

int Character::get_def (void) {
	return def;
}

int Character::get_acc (void) {
	return acc;
}

int Character::get_spd (void) {
	return spd;
}

void Character::print_stats (void) {
	cout << endl << get_name() << "'s Stats:" << endl;
	cout << "Gold: \t" << get_gold () << endl;
	cout << "Level:\t" << get_level() << endl;
	cout << "XP:   \t" << get_xp   () << endl;
	cout << "HP:   \t" << get_hp   () << endl;
	cout << "STR:  \t" << get_str  () << endl;
	cout << "DEF:  \t" << get_def  () << endl;
	cout << "ACC:  \t" << get_acc  () << endl;
	cout << "SPD:  \t" << get_spd  () << endl << endl;
}

#endif