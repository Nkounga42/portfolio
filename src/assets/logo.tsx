import img from '../../public/image.jpg'

const Logo = () => (
  <div className="avatar ">
    <div className="mask mask-squircle w-6">
      <img src={img} />
    </div>
  </div>
);
export default Logo;
