import Card from "./Card";
export function Grid({dealt, data, handleTouch}) {
    let cards = null
  if (dealt) {
    cards = dealt.map((index) => {
      let morty = data[index];
      return <Card key={morty.id} morty={morty} handleTouch={handleTouch} />;
    });
  }

  return <div className="grid">{cards}</div>;
}