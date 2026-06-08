import DesignerCard from "../../../components/reuasbleComponents/Ccard";

const FindCollaborators = () => {
  const designers = [
    {
      id: 1,
      name: "Adebayo Styles",
      location: "Lagos",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200",
      text: "Available for fashion projects",
    },

    {
      id: 2,
      name: "Glory Fashion",
      location: "Abuja",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
      text: "Bridal and evening wear specialist",
    },
  ];

  return (
    <section className="Cards_container">
      {designers.map((item) => (
        <DesignerCard key={item.id} item={item} />
      ))}
    </section>
  );
};

export default FindCollaborators;
