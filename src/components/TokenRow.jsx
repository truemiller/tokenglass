export const TokenRow = ({ tokenData }) => {
  return (
    <tr key={tokenData.name}>
      <td>{tokenData.symbol}</td>
      <td>{tokenData.balance.toLocaleString()}</td>
    </tr>
  );
};
