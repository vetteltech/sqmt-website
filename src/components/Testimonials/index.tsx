import HeaderText from '../common/headerText';
import Tags from '../features/tag';
import ProcessHeader from '../process/process-header';
import TestimonialsCards from './testimonials-card';

function Testimonials() {
  return (
    <div className="w-[100%] flex-col justify-center items-center px-[16px] lg:px-[100px] 2xl:px-[25%] py-[20%] lg:py-[120px]">
      {/* <ProcessHeader
        tagText="Testimonials"
        title="What Real Estate Pros Say"
        description="See how Zameen is transforming the way agents and brokers win leads, close deals, and grow business."
        titleWidth={390}
      /> */}

      <div className="max-w-[103px] mb-[10px]">
        <Tags bgColor="#F4F6FF" text="Testimonials" />
      </div>

      <HeaderText
        PrimaryText="What Real Estate Pros Say"
        secondaryText="See how Zameen is transforming the way agents and brokers win leads, close deals, and grow business."
        primaryStyle={{
          width: '627px',
          textAlignment: 'left',
          isSecondaryBottomText: true,
          mobile: {
            width: '324px',
          },
        }}
      />

      <div className="mt-[80px] lg:mt-[80px] flex flex-col lg:flex-row justify-between items-center w-[100%] gap-[30px]">
        <TestimonialsCards
          logo="/assets/rustomjee.svg"
          description="Zameen made our lead management effortless. Earlier, we struggled to track prospects and often lost potential clients. Now, everything is organized, and our closing rate has improved significantly."
          location="Mumbai, India"
          agents={25}
          performance={[
            { key: '65%', value: 'Reduction in missed leads' },
            { key: '2X', value: 'Increase in monthly closings' },
          ]}
        />
        <TestimonialsCards
          logo="/assets/lodha.png"
          description="Working with Zameen transformed how we handle clients. From generating leads to finalizing deals, the process is smoother and more professional. Our team feels more confident and productive."
          location="Delhi NCR, India"
          agents={40}
          performance={[
            {
              key: '65%',
              value: 'Reduction in follow-up delays',
            },
            {
              key: '38%',
              value: 'Growth in average deal size',
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Testimonials;
