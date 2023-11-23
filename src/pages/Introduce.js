/* eslint-disable jsx-a11y/iframe-has-title */
import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta"; // thay doi tieu de
import Container from "./../components/Container";

const Introduce = () => {

  return (
    <>
      <Meta title="Giới thiệu" />
      <BreadCrumb title="Giới thiệu" />
      <Container class1="contact-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <header className="p-2 bg-primary text-white text-center">
              <h3 className="mb-0">Chào mừng bạn đến với trang web thương mại điện tử của chúng tôi</h3>
            </header>
            <section className="container my-4 contact-item">
              <h2>Giới thiệu</h2>
              <p className="mb-0">Chúng tôi tự hào giới thiệu một trang web thương mại điện tử độc đáo, nơi bạn có thể khám phá và mua sắm các sản phẩm thông minh cho ngôi nhà. Với sự đa dạng và phong phú, chúng tôi mang đến cho bạn một trải nghiệm mua sắm tuyệt vời, giúp cải thiện cuộc sống hàng ngày.</p>
            </section>
            <section className="container my-4 contact-item">
              <h2>Thiết Bị Thông Minh Cho Ngôi Nhà</h2>
              <p>Trang web của chúng tôi cung cấp một loạt các sản phẩm thông minh, bao gồm:</p>
              <ul>
                <li>Máy lọc không khí tiên tiến để cải thiện chất lượng không khí trong ngôi nhà của bạn.</li>
                <li>Quạt hiện đại giúp làm se lạnh không gian sống.</li>
                <li>Đèn thông minh có thể điều chỉnh độ sáng và màu sắc theo ý muốn.</li>
                <li>Máy chiếu để tạo ra trải nghiệm giải trí tuyệt vời.</li>
                <li>Đồ gia dụng thông minh như máy giặt và tủ lạnh kết nối internet.</li>
                <li>TV Box để biến ngôi nhà của bạn thành một trung tâm giải trí.</li>
              </ul>
            </section>
            <section className="container my-4 contact-item">
              <h2>Chất Lượng và Độ Tin Cậy</h2>
              <p>Chúng tôi cam kết cung cấp các sản phẩm có chất lượng cao từ các thương hiệu uy tín. Sự độ tin cậy của chúng tôi đảm bảo rằng bạn luôn nhận được những sản phẩm tốt nhất cho ngôi nhà của mình. Chúng tôi kiểm tra và đánh giá mỗi sản phẩm để đảm bảo chúng đáp ứng những tiêu chuẩn chất lượng cao nhất.</p>
            </section>
            <section className="container my-4 contact-item">
              <h2>Tại Sao Chọn Chúng Tôi?</h2>
              <p>Chúng tôi hiểu rằng bạn có nhiều lựa chọn khi mua sắm trực tuyến. Tại sao nên chọn chúng tôi?</p>
              <ul>
                <li>Sự đa dạng: Chúng tôi cung cấp nhiều loại sản phẩm khác nhau để bạn có thể tìm thấy điều bạn cần.</li>
                <li>Chất lượng: Sản phẩm của chúng tôi đều đạt tiêu chuẩn chất lượng cao.</li>
                <li>Dịch vụ khách hàng xuất sắc: Đội ngũ hỗ trợ khách hàng của chúng tôi luôn sẵn sàng giúp đỡ.</li>
                <li>Giá trị tốt: Chúng tôi cam kết cung cấp sản phẩm với giá trị tốt nhất cho bạn.</li>
                <li>Thỏa mãn mọi nhu cầu: Chúng tôi mang đến cho bạn mọi thứ để làm cho ngôi nhà của bạn thông minh và tiện nghi.</li>
              </ul>
            </section>
            <section className="container my-4 contact-item">
              <h2>Bắt Đầu Mua Sắm Ngay Bây Giờ</h2>
              <p>Đừng bỏ lỡ cơ hội cải thiện cuộc sống hàng ngày của bạn thông qua các sản phẩm thông minh cho ngôi nhà. Hãy truy cập trang web của chúng tôi và bắt đầu mua sắm ngay bây giờ!</p>
            </section>
            <footer className="p-2 bg-primary text-white text-center">
              <p>Cảm ơn bạn đã đến với trang web thương mại điện tử của chúng tôi.</p>
              <p className="mb-0">Chúc bạn có một trải nghiệm mua sắm thật tuyệt vời !</p>
            </footer>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Introduce;
