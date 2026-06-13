import GetInTouchForm from '@/components/ui/GetInTouchForm';

export default function GetInTouchSection() {
  return (
    <section className="get-in-touch-area tmp-section-gapBottom">
      <div className="container" style={{ marginTop: '30px' }}>
        <div className="contact-get-in-touch-wrap">
          <div className="get-in-touch-wrapper tmponhover">
            <div className="row g-5 align-items-center">
              <div className="col-lg-5">
                <div className="section-head text-align-left">
                  <div className="section-sub-title tmp-scroll-trigger tmp-fade-in animation-order-1">
                    <span className="subtitle">GET IN TOUCH</span>
                  </div>
                  <h2 className="title split-collab tmp-scroll-trigger tmp-fade-in animation-order-2">
                    Elevate Your Brand to New Heights
                  </h2>
                  <p className="description tmp-scroll-trigger tmp-fade-in animation-order-3">
                    Every great project begins with a simple, effective conversation. I translate your
                    biggest ideas into the digital world with robust strategy and exceptional design.
                    Let&apos;s start this journey together today.
                  </p>
                </div>
              </div>
              <div className="col-lg-7">
                <div className="contact-inner">
                  <GetInTouchForm />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
