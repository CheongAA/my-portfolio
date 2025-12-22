import { Trans as I18nTrans, type TransProps } from 'react-i18next';

export default function Trans(props: TransProps<string>) {
  return (
    <I18nTrans
      {...props}
      components={{
        br: <br />,
        ...props.components,
      }}
    />
  );
}
