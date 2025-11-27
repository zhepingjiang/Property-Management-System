package com.laioffer.pmsbackend;

import com.laioffer.pmsbackend.model.*;
import com.laioffer.pmsbackend.model.enums.*;
import com.laioffer.pmsbackend.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

@Component
public class DevRunner implements ApplicationRunner {

    static private final Logger logger = LoggerFactory.getLogger(DevRunner.class);

    private final AlertRepository alertRepository;
    private final AnnouncementRepository announcementRepository;
    private final PostRepository postRepository;
    private final NewsletterRepository newsletterRepository;
    private final EventRepository eventRepository;
    private final PolicyRepository policyRepository;
    private final ReplyRepository replyRepository;
    private final MaintenanceRequestRepository maintenanceRequestRepository;
    private final AmenityTypeRepository amenityTypeRepository;
    private final AmenityUnitRepository amenityUnitRepository;
    private final AmenityBookingRepository amenityBookingRepository;
    private final UserRepository userRepository;

    public DevRunner(
            AlertRepository alertRepository,
            AnnouncementRepository announcementRepository,
            PostRepository postRepository,
            NewsletterRepository newsletterRepository,
            EventRepository eventRepository,
            PolicyRepository policyRepository,
            ReplyRepository replyRepository,
            MaintenanceRequestRepository maintenanceRequestRepository,
            AmenityTypeRepository amenityTypeRepository,
            AmenityUnitRepository amenityUnitRepository,
            AmenityBookingRepository amenityBookingRepository,
            UserRepository userRepository
    ) {
        this.alertRepository = alertRepository;
        this.announcementRepository = announcementRepository;
        this.postRepository = postRepository;
        this.newsletterRepository = newsletterRepository;
        this.eventRepository = eventRepository;
        this.policyRepository = policyRepository;
        this.replyRepository = replyRepository;
        this.maintenanceRequestRepository = maintenanceRequestRepository;
        this.amenityTypeRepository = amenityTypeRepository;
        this.amenityUnitRepository = amenityUnitRepository;
        this.amenityBookingRepository = amenityBookingRepository;
        this.userRepository = userRepository;
    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        generateSampleData();
    }

    private void generateSampleData() {
        userRepository.saveAll(List.of(
                // ============================
                // RESIDENTS
                // ============================
                new UserEntity(null, "alice.wong", "alice@example.com", "$2a$10$abc123", UserRole.ROLE_RESIDENT, null),
                new UserEntity(null, "carla.lee", "carla.lee@example.com", "$2a$10$ghi789", UserRole.ROLE_RESIDENT, null),
                new UserEntity(null, "daniel.kim", "daniel.kim@example.com", "$2a$10$jkl012", UserRole.ROLE_RESIDENT, null),
                new UserEntity(null, "felix.yang", "felix.yang@example.com", "$2a$10$pqr678", UserRole.ROLE_RESIDENT, null),
                new UserEntity(null, "grace.lin", "grace.lin@example.com", "$2a$10$stu901", UserRole.ROLE_RESIDENT, null),
                new UserEntity(null, "isabella.hsu", "isabella.hsu@example.com", "$2a$10$yza567", UserRole.ROLE_RESIDENT, null),
                new UserEntity(null, "jack.chen", "jack.chen@example.com", "$2a$10$bcd890", UserRole.ROLE_RESIDENT, null),

                // ============================
                // TRUSTEES
                // ============================
                new UserEntity(null, "ben.chan.admin", "ben.chan@example.com", "$2a$10$def456", UserRole.ROLE_TRUSTEE, null),
                new UserEntity(null, "emily.zhou.admin", "emily.zhou@example.com", "$2a$10$mno345", UserRole.ROLE_TRUSTEE, null),
                new UserEntity(null, "henry.tan.admin", "henry.tan@example.com", "$2a$10$vwx234", UserRole.ROLE_TRUSTEE, null)
        ));

        alertRepository.saveAll(List.of(
                new AlertEntity(
                        null,
                        "Planned Fire Alarm Testing – March 12",
                        "Our building-wide fire alarm system will be tested on Wednesday, March 12 "
                                + "between 10:00 AM and 11:00 AM. Alarms will sound intermittently during "
                                + "this period. Please do not use the elevators during testing and do not "
                                + "call emergency services unless you see real smoke or fire.",
                        List.of(
                                "https://images.pexels.com/photos/12997193/pexels-photo-12997193.jpeg"
                        ),
                        8L,
                        null  // createdAt handled by @CreationTimestamp
                ),
                new AlertEntity(
                        null,
                        "Mechanical Room Maintenance – Possible Hot Water Fluctuations",
                        "Our maintenance team will be servicing the main boiler and plumbing manifolds "
                                + "on Friday between 9:00 AM and 3:00 PM. You may experience brief periods "
                                + "of low water pressure or lukewarm water. We apologize for the inconvenience "
                                + "and appreciate your understanding while we keep the building systems safe.",
                        List.of(
                                "https://images.pexels.com/photos/586019/pexels-photo-586019.jpeg"
                        ),
                        8L,
                        null
                ),
                new AlertEntity(
                        null,
                        "Parking Garage Safety Notice",
                        "Following a recent incident in the underground parking garage, we have increased "
                                + "security patrols and camera monitoring. Please ensure you lock your vehicle, "
                                + "avoid leaving valuables in plain sight, and report any suspicious activity to "
                                + "the concierge or security team immediately.",
                        List.of(
                                "https://images.pexels.com/photos/10500240/pexels-photo-10500240.jpeg"
                        ),
                        9L,
                        null
                ),
                new AlertEntity(
                        null,
                        "Indoor Pool – Temporary Closure for Deep Cleaning",
                        "The indoor pool and adjacent lounge area will be closed for deep cleaning and "
                                + "water quality treatment from Monday to Wednesday. During this time, access "
                                + "to the pool deck will be restricted. We will reopen the facility once "
                                + "all maintenance checks and water tests are complete.",
                        List.of(
                                "https://images.pexels.com/photos/7061661/pexels-photo-7061661.jpeg"
                        ),
                        10L,
                        null
                ),
                new AlertEntity(
                        null,
                        "No Smoking in Hallways, Elevators, and Common Areas",
                        "This is a reminder that smoking and vaping are strictly prohibited in all indoor "
                                + "common areas, including hallways, stairwells, elevators, and the lobby. "
                                + "Repeated violations may result in fines in accordance with the community "
                                + "bylaws. Thank you for helping us maintain a healthy environment for all residents.",
                        null,   // this one intentionally has no image
                        8L,
                        null
                )
        ));

        announcementRepository.saveAll(List.of(
                new AnnouncementEntity(
                        null,
                        "Monthly Community Meeting – March 28",
                        "Our next community meeting will take place on Friday, March 28 at 6:00 PM in the lobby lounge. "
                                + "Topics include spring maintenance updates and upcoming amenity improvements.",
                        8L,
                        List.of("https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg"),
                        null
                ),
                new AnnouncementEntity(
                        null,
                        "Package Room Upgrade Completed",
                        "The package room renovation is officially finished! Residents may now pick up parcels using "
                                + "the updated digital locker system. Instructions will be emailed tomorrow.",
                        8L,
                        List.of("https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg"),
                        null
                ),
                new AnnouncementEntity(
                        null,
                        "Spring Cleaning Week Starts Monday",
                        "Building staff will conduct annual spring cleaning next week. Please keep hallways clear "
                                + "and avoid leaving items outside your unit.",
                        9L,
                        null,   // this announcement has no image
                        null
                )
        ));

        postRepository.saveAll(List.of(
                new PostEntity(
                        null,
                        1L,
                        "Does anyone know when the gym will reopen?",
                        PostStatus.ACTIVE,
                        List.of("https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg"),
                        null
                ),
                new PostEntity(
                        null,
                        2L,
                        "Looking to rent a parking spot for April.",
                        PostStatus.ACTIVE,
                        null,
                        null
                ),
                new PostEntity(
                        null,
                        3L,
                        "Selling a lightly used dining table, DM for pics.",
                        PostStatus.ACTIVE,
                        List.of("https://images.pexels.com/photos/1866149/pexels-photo-1866149.jpeg"),
                        null
                ),
                new PostEntity(
                        null,
                        4L,
                        "Found a key near elevator B. Message me if it’s yours.",
                        PostStatus.ACTIVE,
                        null,
                        null
                ),
                new PostEntity(
                        null,
                        5L,
                        "Anyone interested in forming a morning running group?",
                        PostStatus.ACTIVE,
                        null,
                        null
                ),
                new PostEntity(
                        null,
                        6L,
                        "Leasing out my parking spot for 2 months. PM if interested.",
                        PostStatus.ACTIVE,
                        null,
                        null
                ),
                new PostEntity(
                        null,
                        7L,
                        "Noise coming from 10th floor last night—anyone else hear it?",
                        PostStatus.ACTIVE,
                        null,
                        null
                ),
                new PostEntity(
                        null,
                        8L,
                        "Organizing a board game night this Saturday. All welcome!",
                        PostStatus.ACTIVE,
                        List.of("https://images.pexels.com/photos/411207/pexels-photo-411207.jpeg"),
                        null
                ),
                new PostEntity(
                        null,
                        9L,
                        "Looking for recommendations for a cleaning service.",
                        PostStatus.ACTIVE,
                        null,
                        null
                ),
                new PostEntity(
                        null,
                        10L,
                        "Lost a small black umbrella in the lobby. Please let me know if found.",
                        PostStatus.ACTIVE,
                        null,
                        null
                )
        ));

        replyRepository.saveAll(List.of(
                new ReplyEntity(null, 2L, "I heard maintenance said it should reopen next Monday!", 1L, null),
                new ReplyEntity(null, 3L, "Thanks for asking, I was wondering too.", 1L, null),

                new ReplyEntity(null, 4L, "Check with unit 23B, they rented out an extra spot before.", 2L, null),

                new ReplyEntity(null, 1L, "Interested! Can you share dimensions?", 3L, null),

                new ReplyEntity(null, 5L, "Might be mine! Is it a grey metal key with a blue tag?", 4L, null),

                new ReplyEntity(null, 2L, "Count me in! Early mornings work great.", 5L, null),
                new ReplyEntity(null, 6L, "Would love to join—what time are you planning?", 5L, null),

                new ReplyEntity(null, 3L, "I’m interested. What’s the monthly rate?", 6L, null),

                new ReplyEntity(null, 8L, "Yes, I heard it too. Sounded like construction around 11 PM.", 7L, null),
                new ReplyEntity(null, 10L, "I think it came from the ventilation system.", 7L, null),

                new ReplyEntity(null, 1L, "Fun idea! Which games are you planning?", 8L, null),
                new ReplyEntity(null, 7L, "I can bring Catan and Azul.", 8L, null),

                new ReplyEntity(null, 3L, "We used SparkClean last month — very good.", 9L, null),

                new ReplyEntity(null, 6L, "Saw one near the mailboxes earlier today.", 10L, null)
        ));

        newsletterRepository.saveAll(List.of(
                new NewsletterEntity(
                        null,
                        "January Community Highlights",
                        "Happy New Year! This month's newsletter covers renovation updates, "
                                + "community event recaps, and upcoming maintenance schedules.",
                        List.of("https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg"),
                        10L,
                        null
                ),
                new NewsletterEntity(
                        null,
                        "Spring Cleaning Tips for Condo Residents",
                        "With warmer weather on the way, here are some simple spring-cleaning "
                                + "ideas to keep your unit fresh and organized.",
                        List.of("https://images.pexels.com/photos/3616764/pexels-photo-3616764.jpeg"),
                        8L,
                        null
                ),
                new NewsletterEntity(
                        null,
                        "Upcoming Summer Activities",
                        "Our annual summer BBQ, rooftop social, and family pool events are "
                                + "returning soon. Stay tuned for dates and sign-up information!",
                        List.of("https://images.pexels.com/photos/2446393/pexels-photo-2446393.jpeg"),
                        9L,
                        null
                )
        ));

        eventRepository.saveAll(List.of(
                new EventEntity(
                        null,
                        "Community BBQ – July 14",
                        "Join us for food, drinks, and music on the outdoor patio! "
                                + "All residents are welcome.",
                        List.of("https://images.pexels.com/photos/5638260/pexels-photo-5638260.jpeg"),
                        8L,
                        null
                ),
                new EventEntity(
                        null,
                        "Board Game Night – Friday 7 PM",
                        "Bring your favorite board game or join one of our group tables. "
                                + "Snacks will be provided!",
                        List.of("https://images.pexels.com/photos/411207/pexels-photo-411207.jpeg"),
                        8L,
                        null
                ),
                new EventEntity(
                        null,
                        "Morning Yoga Session – Rooftop Deck",
                        "A peaceful yoga class suitable for all skill levels. "
                                + "Please bring your own mat.",
                        List.of("https://images.pexels.com/photos/3823039/pexels-photo-3823039.jpeg"),
                        9L,
                        null
                ),
                new EventEntity(
                        null,
                        "Holiday Decoration Workshop",
                        "Learn how to create beautiful holiday decorations using simple materials. "
                                + "Great for families and kids!",
                        List.of("https://images.pexels.com/photos/62687/pexels-photo-62687.jpeg"),
                        9L,
                        null
                ),
                new EventEntity(
                        null,
                        "Financial Literacy Seminar",
                        "Join our guest speaker to learn budgeting strategies, credit basics, "
                                + "and smart financial planning tips.",
                        List.of("https://images.pexels.com/photos/3183165/pexels-photo-3183165.jpeg"),
                        10L,
                        null
                )
        ));

        policyRepository.saveAll(List.of(
                new PolicyEntity(
                        null,
                        "Noise Control Policy",
                        "Quiet hours are enforced daily from 10:00 PM to 7:00 AM. "
                                + "Residents are asked to keep music, appliances, and gatherings "
                                + "at a reasonable volume to avoid disturbing neighbors.",
                        9L,
                        null
                ),
                new PolicyEntity(
                        null,
                        "Pet Ownership Guidelines",
                        "All pets must be registered with the management office. "
                                + "Leashes are required in common areas, and owners are responsible "
                                + "for cleaning up after their pets.",
                        8L,
                        null
                )
        ));

        maintenanceRequestRepository.saveAll(List.of(
                new MaintenanceRequestEntity(
                        null,
                        1L,                                    // authorId
                        "Treadmill stops after 5 minutes",      // title
                        "Gym",                                  // property
                        "Equipment Area",                       // unit / location
                        MaintenanceCategory.APPLIANCES,         // category
                        "The treadmill near the window shuts off automatically after ~5 minutes of use.",
                        MaintenanceStatus.SUBMITTED,
                        MaintenancePriority.HIGH,
                        10L,                                   // assigned to trustee
                        List.of("https://images.pexels.com/photos/1954524/pexels-photo-1954524.jpeg"),
                        Instant.parse("2025-11-10T10:00:00Z")
                ),

                new MaintenanceRequestEntity(
                        null,
                        2L,
                        "No heat in the unit",
                        "Fairview",
                        "Unit 305",
                        MaintenanceCategory.HOUSEHOLD,
                        "Heating has not worked since yesterday evening. Thermostat unresponsive.",
                        MaintenanceStatus.IN_PROGRESS,
                        MaintenancePriority.HIGH,
                        9L,
                        List.of("https://images.pexels.com/photos/19090/pexels-photo.jpg"),
                        Instant.parse("2025-11-11T09:00:00Z")
                ),

                new MaintenanceRequestEntity(
                        null,
                        3L,
                        "Leak around washing machine",
                        "Fairview",
                        "Laundry Room",
                        MaintenanceCategory.PLUMBING,
                        "Water leaking around machine #3, small puddle forms every 20 minutes.",
                        MaintenanceStatus.SUBMITTED,
                        MaintenancePriority.MEDIUM,
                        10L,
                        null,
                        Instant.parse("2025-11-09T15:30:00Z")
                ),

                new MaintenanceRequestEntity(
                        null,
                        4L,
                        "Garage door sensor not responding",
                        "Maison",
                        "Parking Level P1",
                        MaintenanceCategory.ELECTRICAL,
                        "Garage door sensor is not triggering. Door won't close reliably.",
                        MaintenanceStatus.IN_PROGRESS,
                        MaintenancePriority.HIGH,
                        10L,
                        null,
                        Instant.parse("2025-11-08T12:45:00Z")
                ),

                new MaintenanceRequestEntity(
                        null,
                        5L,
                        "Light flickering near elevator",
                        "Fairview",
                        "Hallway 5F",
                        MaintenanceCategory.HOUSE_EXTERIOR,
                        "The light fixture near the elevator flickers constantly, may be a wiring issue.",
                        MaintenanceStatus.SUBMITTED,
                        MaintenancePriority.LOW,
                        null,
                        null,
                        Instant.parse("2025-11-07T18:20:00Z")
                ),

                new MaintenanceRequestEntity(
                        null,
                        6L,
                        "Pool water temperature low",
                        "Maison",
                        "Swimming Pool",
                        MaintenanceCategory.OTHER,
                        "Water temperature seems below normal for the past two days.",
                        MaintenanceStatus.RESOLVED,
                        MaintenancePriority.MEDIUM,
                        10L,
                        List.of("https://images.pexels.com/photos/261327/pexels-photo-261327.jpeg"),
                        Instant.parse("2025-11-05T14:10:00Z")
                )
        ));

        replyRepository.saveAll(List.of(
                new ReplyEntity(null, 10L, "Thanks for reporting. Assigned to maintenance.", null, 1L),
                new ReplyEntity(null, 3L, "Same treadmill stopped on me last week.", null, 1L),

                new ReplyEntity(null, 9L, "Technician scheduled to visit today at 3 PM.", null, 2L),

                new ReplyEntity(null, 10L, "We shut down Washer #3 temporarily.", null, 3L),

                new ReplyEntity(null, 9L, "Sensor replaced. Monitoring stability.", null, 4L),

                new ReplyEntity(null, 1L, "It got worse today—flickers every 5 seconds.", null, 5L),

                new ReplyEntity(null, 8L, "Temperature restored to normal yesterday.", null, 6L)
        ));

        /* Amenity Bookings Sample Data */
        List<AmenityTypeEntity> types = amenityTypeRepository.saveAll(List.of(
                new AmenityTypeEntity(null, "BBQ", "Outdoor barbecue grill", Duration.ofHours(1), List.of("https://images.squarespace-cdn.com/content/v1/588f58d329687f771619ca24/1583177092358-T5O3NS5VIN9VHVFNZCNQ/landscape-design-outdoor-kitchen-fire-feature-seating-pergolas.jpg"), true, null),
                new AmenityTypeEntity(null, "Billiards Table", "Games room pool table", Duration.ofHours(1), List.of("https://cdn11.bigcommerce.com/s-y01lg6enax/images/stencil/1280x1280/products/1918/7297/La_Condo_Pool_Table_Canada_Billard_2_1__50317.1752174375.jpg?c=1"), true, null),
//                new AmenityTypeEntity(null, "Guest Suite", "Furnished suite for visitors", Duration.ofDays(1), true, null),
                new AmenityTypeEntity(null, "Party Room", "Large room for private events", Duration.ofHours(1), List.of("https://www.tagvenue.com/resize/97/2b/fit-900-600%3B65797-wavy-barbershop-room.jpeg"), true, null),
                new AmenityTypeEntity(null, "Service Elevator", "Elevator for moving items or deliveries", Duration.ofHours(1), List.of("https://westernelevator.com/wp-content/uploads/2023/04/elevator-cabin-1.jpg"), true, null),
                new AmenityTypeEntity(null, "Theatre Room", "Mini-theatre for screenings", Duration.ofHours(1), List.of("https://thumbs.cityrealty.com/assets/smart/1004x/webp/0/08/08104a92c20ec88d07ea3a2acb5c1c9045482c51/screening-room.jpg"), true, null),
                new AmenityTypeEntity(null, "Swimming Pool", "Indoor recreational swimming pool", Duration.ofHours(1), List.of("https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=1600"), true, null)
        ));

        Long BBQ = types.get(0).getId();
        Long BILLIARDS = types.get(1).getId();
//        Long GUEST_SUITE = types.get(2).getId();
        Long PARTY_ROOM = types.get(2).getId();
        Long SERVICE_ELEVATOR = types.get(3).getId();
        Long THEATRE = types.get(4).getId();
        Long SWIMMING_POOL = types.get(5).getId();

        List<AmenityUnitEntity> units = amenityUnitRepository.saveAll(List.of(
                // BBQ units
                new AmenityUnitEntity(null, BBQ, "BBQ A", 1, "Roof Deck Area A", true, null),
                new AmenityUnitEntity(null, BBQ, "BBQ B", 1, "Roof Deck Area B", true, null),
                new AmenityUnitEntity(null, BBQ, "BBQ C", 1, "Garden Level Patio", true, null),

                // Billiards
                new AmenityUnitEntity(null, BILLIARDS, "Billiards Table", 1, "Games Room", true, null),

//                // Guest Suites
//                new AmenityUnitEntity(null, GUEST_SUITE, "Guest Suite #1", 1, "Floor 2 - Suite A", true, null),
//                new AmenityUnitEntity(null, GUEST_SUITE, "Guest Suite #2", 1, "Floor 2 - Suite B", true, null),
//                new AmenityUnitEntity(null, GUEST_SUITE, "Guest Suite #3", 1, "Floor 2 - Suite C", true, null),

                // Party Room
                new AmenityUnitEntity(null, PARTY_ROOM, "Party Room", 1, "Ground Floor Event Hall", true, null),

                // Service Elevators
                new AmenityUnitEntity(null, SERVICE_ELEVATOR, "Service Elevator A", 1, "North Wing", true, null),
                new AmenityUnitEntity(null, SERVICE_ELEVATOR, "Service Elevator B", 1, "South Wing", true, null),

                // Theatre Room
                new AmenityUnitEntity(null, THEATRE, "Theatre Room", 1, "Basement Level", true, null),

                // Swimming Pool
                new AmenityUnitEntity(null, SWIMMING_POOL, "Swimming Pool", 8, "Recreation Floor", true, null)
        ));

        Long BBQ1 = units.get(0).getId();
        Long BBQ2 = units.get(1).getId();
        Long BBQ3 = units.get(2).getId();

        Long BILLIARDS1 = units.get(3).getId();

//        Long GS1 = units.get(4).getId();
//        Long GS2 = units.get(5).getId();
//        Long GS3 = units.get(6).getId();

        Long PARTY = units.get(4).getId();

        Long SE1 = units.get(5).getId();
        Long SE2 = units.get(6).getId();

        Long THEATRE1 = units.get(7).getId();

        Long POOL = units.get(8).getId();

        amenityBookingRepository.saveAll(List.of(
                // Future booking — ACTIVE
                new AmenityBookingEntity(
                        null,
                        BBQ1,
                        1L,
                        1,
                        Instant.parse("2025-12-10T21:00:00Z"), // 16:00 Toronto
                        Instant.parse("2025-12-10T23:00:00Z"), // 18:00 Toronto
                        AmenityBookingStatus.ACTIVE,
                        null
                ),

                // Future booking — ACTIVE
                new AmenityBookingEntity(
                        null,
                        BBQ2,
                        2L,
                        2,
                        Instant.parse("2025-12-15T17:00:00Z"), // 12:00 Toronto
                        Instant.parse("2025-12-15T19:00:00Z"), // 14:00 Toronto
                        AmenityBookingStatus.ACTIVE,
                        null
                ),

                // PARTY ROOM — trustee booking
                new AmenityBookingEntity(
                        null,
                        PARTY,
                        10L,
                        1,
                        Instant.parse("2025-12-20T22:00:00Z"), // 17:00 Toronto
                        Instant.parse("2025-12-21T03:00:00Z"), // 22:00 Toronto
                        AmenityBookingStatus.ACTIVE,
                        null
                ),

                // Swimming Pool — ACTIVE
                new AmenityBookingEntity(
                        null,
                        POOL,
                        5L,
                        4,
                        Instant.parse("2025-12-18T15:00:00Z"), // 10:00 Toronto
                        Instant.parse("2025-12-18T17:00:00Z"), // 12:00 Toronto
                        AmenityBookingStatus.ACTIVE,
                        null
                ),

                // Theatre — ACTIVE
                new AmenityBookingEntity(
                        null,
                        THEATRE1,
                        7L,
                        1,
                        Instant.parse("2025-12-30T23:00:00Z"), // 18:00 Toronto
                        Instant.parse("2025-12-31T02:00:00Z"), // 21:00 Toronto
                        AmenityBookingStatus.ACTIVE,
                        null
                ),

                // SE1 — ACTIVE
                new AmenityBookingEntity(
                        null,
                        SE1,
                        8L,
                        1,
                        Instant.parse("2025-12-08T14:00:00Z"), // 09:00 Toronto
                        Instant.parse("2025-12-08T15:00:00Z"), // 10:00 Toronto
                        AmenityBookingStatus.ACTIVE,
                        null
                ),

                // Old booking — EXPIRED
                new AmenityBookingEntity(
                        null,
                        BBQ3,
                        3L,
                        1,
                        Instant.parse("2025-03-10T21:00:00Z"), // 16:00 Toronto
                        Instant.parse("2025-03-10T22:00:00Z"), // 17:00 Toronto
                        AmenityBookingStatus.EXPIRED,
                        null
                ),

                // Old booking — CANCELLED
                new AmenityBookingEntity(
                        null,
                        POOL,
                        4L,
                        2,
                        Instant.parse("2025-03-05T19:00:00Z"), // 14:00 Toronto
                        Instant.parse("2025-03-05T20:30:00Z"), // 15:30 Toronto
                        AmenityBookingStatus.CANCELLED,
                        null
                )
        ));

    }
}
