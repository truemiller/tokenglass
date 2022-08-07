export const TokenRow = ({ tokenData }) => {
  return (
    <tr key={tokenData.name}>
      <td>
        <img
          src={tokenData.logo}
          alt=""
          width={24}
          className={"me-2 rounded-circle"}
        />
        {tokenData.symbol}
      </td>
      <td>{tokenData.balance.toLocaleString()}</td>
    </tr>
  );
};
