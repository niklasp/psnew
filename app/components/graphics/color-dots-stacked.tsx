export function ColorDotsStacked({}) {
  return (
    <div className="inline-flex flex-col space-y-1 justify-between mx-2">
      <div className="w-2 h-2 rounded-full bg-polkadot-primary" />
      <div className="w-2 h-2 rounded-full bg-polkadot-secondary" />
      <div className="w-2 h-2 rounded-full bg-polkadot-tertiary" />
      <div className="w-2 h-2 rounded-full bg-polkadot-quaternary" />
      <div className="w-2 h-2 rounded-full bg-polkadot-quinary" />
    </div>
  );
}
