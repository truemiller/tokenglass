export const TokenRow = ({ tokenData }) => {
  return (
    <tr key={tokenData.name}>
      <td className={"d-flex"}>
        <img
          src={tokenData.logo}
          alt=""
          width={36}
          height={36}
          className={"me-2 rounded-circle"}
        />
        <img
          className={"chain-logo rounded-circle bg-white shadow border"}
          src={tokenData.chain.logo}
          alt=""
          width={18}
          height={18}
          style={{ marginLeft: -18 }}
        />
        <div className={"d-flex flex-column ms-2"}>
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
