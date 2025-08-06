-- TODO: Rename database
-- Check for errors in the SQL dump
-- Ensure that all necessary tables and constraints are created
CREATE TABLE public.customers (
    id integer NOT NULL,
    username text NOT NULL,
    points integer,
    pword text NOT NULL,
    name text
);

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;

CREATE TABLE public.group_members (
    group_id integer NOT NULL,
    customer_id integer NOT NULL,
    is_leader boolean DEFAULT false,
    points integer DEFAULT 0
);

CREATE TABLE public.groups (
    id integer NOT NULL,
    name text NOT NULL,
    description text
);

CREATE SEQUENCE public.groups_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.groups_id_seq OWNED BY public.groups.id;

CREATE TABLE public.penalties (
    id integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    description text,
    group_id integer NOT NULL,
    user_id integer
);

CREATE SEQUENCE public.penalties_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.penalties_id_seq OWNED BY public.penalties.id;

CREATE TABLE public.rewards (
    id integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    description text,
    group_id integer NOT NULL,
    user_id integer
);

CREATE SEQUENCE public.rewards_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.rewards_id_seq OWNED BY public.rewards.id;

CREATE TABLE public.tasks (
    id integer NOT NULL,
    name text NOT NULL,
    price integer NOT NULL,
    description text,
    group_id integer NOT NULL,
    user_id integer
);

CREATE SEQUENCE public.tasks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;

CREATE TABLE public.transactions (
    transactionid integer NOT NULL,
    customerid integer NOT NULL,
    taskid integer,
    rewardid integer,
    penaltyid integer,
    taskname character varying(255),
    rewardname character varying(255),
    penaltyname character varying(255),
    pointschange integer NOT NULL,
    transactiondate date NOT NULL,
    transactiontype character varying(10) NOT NULL,
    CONSTRAINT transactions_check CHECK (((taskid IS NOT NULL AND rewardid IS NULL AND penaltyid IS NULL) OR (taskid IS NULL AND rewardid IS NOT NULL AND penaltyid IS NULL) OR (taskid IS NULL AND rewardid IS NULL AND penaltyid IS NOT NULL)))
);

CREATE SEQUENCE public.transactions_transactionid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.transactions_transactionid_seq OWNED BY public.transactions.transactionid;

ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);
ALTER TABLE ONLY public.groups ALTER COLUMN id SET DEFAULT nextval('public.groups_id_seq'::regclass);
ALTER TABLE ONLY public.penalties ALTER COLUMN id SET DEFAULT nextval('public.penalties_id_seq'::regclass);
ALTER TABLE ONLY public.rewards ALTER COLUMN id SET DEFAULT nextval('public.rewards_id_seq'::regclass);
ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);
ALTER TABLE ONLY public.transactions ALTER COLUMN transactionid SET DEFAULT nextval('public.transactions_transactionid_seq'::regclass);

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_username_key UNIQUE (username);
ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT group_members_pkey PRIMARY KEY (group_id, customer_id);
ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.penalties
    ADD CONSTRAINT penalties_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.rewards
    ADD CONSTRAINT rewards_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (transactionid);

ALTER TABLE ONLY public.rewards
    ADD CONSTRAINT fk_group FOREIGN KEY (group_id) REFERENCES public.groups(id);
ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT fk_group FOREIGN KEY (group_id) REFERENCES public.groups(id);
ALTER TABLE ONLY public.penalties
    ADD CONSTRAINT fk_group FOREIGN KEY (group_id) REFERENCES public.groups(id);
ALTER TABLE ONLY public.rewards
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.customers(id);
ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.customers(id);
ALTER TABLE ONLY public.penalties
    ADD CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.customers(id);
ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT group_members_customer_id_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id);
ALTER TABLE ONLY public.group_members
    ADD CONSTRAINT group_members_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.groups(id);
ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_customerid_fkey FOREIGN KEY (customerid) REFERENCES public.customers(id);