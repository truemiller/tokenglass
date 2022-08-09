export const TokenRow = ({ tokenData }) => {
  return (
    <tr key={tokenData.name} className={"w-full"}>
      <td className={"flex p-3"}>
        <img src={tokenData.logo} alt="" className={"rounded-full w-8 h-8"} />
        <img
          className={"w-4 h-4 m-0 -ml-2 rounded-full bg-white mr-3"}
          src={tokenData.chain.logo}
          alt=""
        />
        <div className={"flex flex-col ms-2"}>
          <strong>{tokenData.name}</strong>
          {tokenData.symbol}
        </div>
      </td>
      <td>{tokenData.balance.toLocaleString()}</td>
      <td>$ {tokenData.price}</td>
      <td>$ {tokenData.total ? tokenData.total.toLocaleString() : ""}</td>
    </tr>
  );
};
