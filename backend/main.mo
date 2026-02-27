import Map "mo:core/Map";
import Iter "mo:core/Iter";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Nat "mo:core/Nat";

actor {
  type MedicineId = Nat;
  type SectionName = Text;

  type Medicine = {
    id : MedicineId;
    name : Text;
    description : Text;
    price : Nat;
    category : Text;
    available : Bool;
  };

  module Medicine {
    public func compareByPrice(m1 : Medicine, m2 : Medicine) : Order.Order {
      Nat.compare(m1.price, m2.price);
    };
  };

  type EditableContent = {
    heroText : Text;
    aboutText : Text;
    services : [Text];
    announcements : [Text];
  };

  var nextMedicineId : MedicineId = 1;

  let medicines = Map.empty<MedicineId, Medicine>();
  let contentSections = Map.empty<SectionName, Text>();

  func getNextMedicineId() : MedicineId {
    let currentId = nextMedicineId;
    nextMedicineId += 1;
    currentId;
  };

  public shared ({ caller }) func addMedicine(
    name : Text,
    description : Text,
    price : Nat,
    category : Text,
  ) : async MedicineId {
    let id = getNextMedicineId();
    let medicine : Medicine = {
      id;
      name;
      description;
      price;
      category;
      available = true;
    };
    medicines.add(id, medicine);
    id;
  };

  public shared ({ caller }) func editMedicine(
    id : MedicineId,
    name : Text,
    description : Text,
    price : Nat,
    category : Text,
    available : Bool,
  ) : async () {
    switch (medicines.get(id)) {
      case (null) { Runtime.trap("Medicine not found") };
      case (?medicine) {
        let updatedMedicine : Medicine = {
          id;
          name;
          description;
          price;
          category;
          available;
        };
        medicines.add(id, updatedMedicine);
      };
    };
  };

  public shared ({ caller }) func deleteMedicine(id : MedicineId) : async () {
    if (not medicines.containsKey(id)) {
      Runtime.trap("Medicine not found");
    };
    medicines.remove(id);
  };

  public query ({ caller }) func listMedicines() : async [Medicine] {
    medicines.toArray().map(func((_, v)) { v });
  };

  public query ({ caller }) func getMedicinesByCategory(category : Text) : async [Medicine] {
    let filteredIter = medicines.values().filter(
      func(med) { Text.equal(med.category, category) }
    );
    filteredIter.toArray();
  };

  public query ({ caller }) func getAvailableMedicines() : async [Medicine] {
    let filteredIter = medicines.values().filter(
      func(med) { med.available }
    );
    filteredIter.toArray();
  };

  public query ({ caller }) func getMedicinesSortedByPrice() : async [Medicine] {
    let allMedicines = medicines.toArray().map(func((_, v)) { v });
    allMedicines.sort(Medicine.compareByPrice);
  };

  public shared ({ caller }) func updateContent(section : SectionName, content : Text) : async () {
    contentSections.add(section, content);
  };

  public query ({ caller }) func getContent(section : SectionName) : async Text {
    switch (contentSections.get(section)) {
      case (null) { Runtime.trap("Content section not found") };
      case (?content) { content };
    };
  };

  public query ({ caller }) func getAllContent() : async [(SectionName, Text)] {
    contentSections.toArray();
  };

  public query ({ caller }) func getMedicalProduct(id : MedicineId) : async Medicine {
    switch (medicines.get(id)) {
      case (null) { Runtime.trap("Medicine not found") };
      case (?medicine) { medicine };
    };
  };

  public query ({ caller }) func searchMedicines(search : Text) : async [Medicine] {
    let filteredIter = medicines.values().filter(
      func(med) { med.name.contains(#text search) }
    );
    filteredIter.toArray();
  };
};
