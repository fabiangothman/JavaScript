import Image from 'next/image';

const loader = ({src}) => {
  return src;
};

const CmsImage = (props) => {
  return <Image {...props} loader={loader} />
}

export default CmsImage